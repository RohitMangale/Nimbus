// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PartRegistry {
    struct Part {
        uint    id;
        address owner;
        string  maintenanceCID;
        string  certCID;
        bool    forSale;
    }

    mapping(uint => Part) public parts;

    event PartMinted(uint indexed id, address indexed owner);
    event PartTransferred(uint indexed id, address indexed from, address indexed to);
    event PartListed(uint indexed id, uint price);
    event PartUnlisted(uint indexed id);

    function mintPart(
        uint id,
        string memory maintenanceCID,
        string memory certCID
    ) public {
        require(parts[id].owner == address(0), "Already exists");
        parts[id] = Part(id, msg.sender, maintenanceCID, certCID, false);
        emit PartMinted(id, msg.sender);
    }

    function transferPart(uint id, address to) public {
        Part storage p = parts[id];
        require(p.owner == msg.sender, "Not owner");
        p.owner = to;
        emit PartTransferred(id, msg.sender, to);
    }

    function listForSale(uint id, uint price) public {
        Part storage p = parts[id];
        require(p.owner == msg.sender, "Not owner");
        p.forSale = true;
        emit PartListed(id, price);
    }

    function unlist(uint id) public {
        Part storage p = parts[id];
        require(p.owner == msg.sender, "Not owner");
        p.forSale = false;
        emit PartUnlisted(id);
    }
}
