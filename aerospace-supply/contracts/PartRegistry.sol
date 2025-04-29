// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PartRegistry {
    struct MaintenanceRecord {
        uint256 timestamp;
        string description;
        string maintenanceCID;
    }

    struct Part {
        uint256 id;
        string owner;
        string serialId;
        string partDescription;
        string manufacturingCompany;
        uint256 manufacturingDate;
        MaintenanceRecord[] maintenanceHistory;
        bool forSale;
    }

    struct Listing {
        uint256 price;
        uint256 listDate;
        address seller;
    }

    mapping(uint256 => Part) public parts;
    mapping(string => uint256[]) public ownerParts;
    mapping(string => uint256) public serialToPartId; // New mapping
    mapping(uint256 => Listing) public listings;
    uint256 public totalParts;

    // Existing events
    event PartCreated(uint256 indexed id, string owner, string serialId, string partDescription, string manufacturingCompany);
    event MaintenanceAdded(uint256 indexed id, uint256 timestamp, string description);
    event OwnershipTransferred(uint256 indexed id, string previousOwner, string newOwner);
    event PartListed(uint256 indexed id, uint256 price);
    event PartUnlisted(uint256 indexed id);

    function createPart(
        string memory ownerName,
        string memory serialId,
        string memory partDescription,
        string memory manufacturingCompany,
        uint256 manufacturingDate,
        string memory initialMaintenanceCID,
        string memory initialDescription
    ) public {
        require(serialToPartId[serialId] == 0, "Serial ID already exists");
        
        uint256 newPartId = totalParts++;
        serialToPartId[serialId] = newPartId;

        Part storage newPart = parts[newPartId];
        newPart.id = newPartId;
        newPart.owner = ownerName;
        newPart.serialId = serialId;
        newPart.partDescription = partDescription;
        newPart.manufacturingCompany = manufacturingCompany;
        newPart.manufacturingDate = manufacturingDate;
        newPart.forSale = false;

        ownerParts[ownerName].push(newPartId);

        if (bytes(initialMaintenanceCID).length > 0) {
            newPart.maintenanceHistory.push(MaintenanceRecord({
                timestamp: block.timestamp,
                description: initialDescription,
                maintenanceCID: initialMaintenanceCID
            }));
        }

        emit PartCreated(newPartId, ownerName, serialId, partDescription, manufacturingCompany);
    }

    // New serial ID based listing functions
    function listForSaleBySerial(string memory serialId, uint256 price) public {
    uint256 id = serialToPartId[serialId];
    //require(id != 0, "Invalid serial ID");
    
    parts[id].forSale = true;
    listings[id] = Listing({
        price: price,
        listDate: block.timestamp,
        seller: msg.sender
    });
    
    emit PartListed(id, price);
}

    function unlistFromSaleBySerial(string memory serialId) public {
        uint256 id = serialToPartId[serialId];
        // require(id != 0, "Invalid serial ID"); // Remove validation
        parts[id].forSale = false;
        emit PartUnlisted(id);
    }

    function getMarketplaceListings() external view returns (
        uint256[] memory,
        string[] memory,
        Listing[] memory
    ) {
        uint256 count = 0;
        for (uint256 i = 0; i < totalParts; i++) {
            if (parts[i].forSale) count++;
        }

        uint256[] memory ids = new uint256[](count);
        string[] memory serialIds = new string[](count);
        Listing[] memory listingInfo = new Listing[](count);
        
        uint256 index = 0;
        for (uint256 i = 0; i < totalParts; i++) {
            if (parts[i].forSale) {
                ids[index] = i;
                serialIds[index] = parts[i].serialId;
                listingInfo[index] = listings[i];
                index++;
            }
        }
        
        return (ids, serialIds, listingInfo);
    }

    // Existing functions remain unchanged below
    function getPartsByOwner(string memory ownerName) public view returns (uint256[] memory) {
        return ownerParts[ownerName];
    }

    function getPartsByManufacturingCompany(string memory company) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](totalParts);
        uint256 count = 0;

        for (uint256 i = 0; i < totalParts; i++) {
            if (keccak256(bytes(parts[i].manufacturingCompany)) == keccak256(bytes(company))) {
                result[count] = i;
                count++;
            }
        }

        uint256[] memory partsByCompany = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            partsByCompany[i] = result[i];
        }

        return partsByCompany;
    }

    function addMaintenanceRecord(uint256 id, string memory description, string memory maintenanceCID) public {
        Part storage part = parts[id];
        part.maintenanceHistory.push(MaintenanceRecord({
            timestamp: block.timestamp,
            description: description,
            maintenanceCID: maintenanceCID
        }));
        emit MaintenanceAdded(id, block.timestamp, description);
    }

    function transferOwnership(uint256 id, string memory newOwner) public {
        Part storage part = parts[id];
        string memory previousOwner = part.owner;
        
        part.owner = newOwner;
        part.forSale = false;
        
        ownerParts[newOwner].push(id);
        emit OwnershipTransferred(id, previousOwner, newOwner);
    }

    // Simplified purchase (no payment handling)
    function buyPart(string memory serialId, string memory newOwner) public {
        uint256 id = serialToPartId[serialId];
        transferOwnership(id, newOwner);
    }

    function listForSale(uint256 id, uint256 price) public {
        Part storage part = parts[id];
        require(!part.forSale, "Already listed");
        part.forSale = true;
        emit PartListed(id, price);
    }

    function unlistFromSale(uint256 id) public {
        Part storage part = parts[id];
        require(part.forSale, "Not listed");
        part.forSale = false;
        emit PartUnlisted(id);
    }

    function getMaintenanceHistoryCount(uint256 id) public view returns (uint256) {
        return parts[id].maintenanceHistory.length;
    }

    function getMaintenanceRecord(uint256 id, uint256 index) public view returns (
        uint256 timestamp,
        string memory description,
        string memory maintenanceCID
    ) {
        MaintenanceRecord storage record = parts[id].maintenanceHistory[index];
        return (record.timestamp, record.description, record.maintenanceCID);
    }

    function getPartDetails(uint256 id) public view returns (
        string memory owner,
        string memory serialId,
        string memory partDescription,
        string memory manufacturingCompany,
        uint256 manufacturingDate,
        bool forSale,
        uint256 maintenanceCount,
        string memory latestMaintenanceCID,
        string memory latestMaintenanceDescription
    ) {
        Part storage part = parts[id];
        uint256 count = part.maintenanceHistory.length;
        string memory cid = "";
        string memory description = "";

        if (count > 0) {
            MaintenanceRecord storage latestRecord = part.maintenanceHistory[count - 1];
            cid = latestRecord.maintenanceCID;
            description = latestRecord.description;
        }

        return (
            part.owner,
            part.serialId,
            part.partDescription,
            part.manufacturingCompany,
            part.manufacturingDate,
            part.forSale,
            count,
            cid,
            description
        );
    }
}