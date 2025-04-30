
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane } from "lucide-react";


const PartCard = (part) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 bg-blue-100 rounded-full">
          <Plane className="h-6 w-6 text-blue-700" />
        </div>
        <div>
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <p className="text-sm text-gray-500">Part #{part.serialId}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-500">Description:</span>
            <span className="font-medium">{part.description}</span>
            
            <span className="text-gray-500">Owned By:</span>
            <span className="font-medium">{part.company}</span>
            
            <span className="text-gray-500">Price:</span>
            <span className="font-medium">${part.price}</span>
            
            {/* <span className="text-gray-500">Last Inspection:</span>
            <span className="font-medium">{lastInspection}</span> */}
          </div>
          {part.cid && (
                                <a
                                    href={`https://gateway.pinata.cloud/ipfs/${part.cid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-blue-600 hover:underline"
                                >
                                    View Maintenance Records
                                </a>
                            )}
                          <div className="pt-4 space-y-2">
                                <button 
                                    className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                    // onClick={() => handlePurchase(part.id)}
                                >
                                    Purchase Part
                                </button>
                                <p className="text-sm text-gray-500">
                                    Sold by: {part.owner}
                                </p>
                            </div>

          {/* <div className="mt-4 flex justify-between items-center">
            <Badge variant={condition === "New" ? "default" : "secondary"}>
              {condition}
            </Badge>
          </div> */}
          
        </div>
      </CardContent>
    </Card>
  );
};

export default PartCard;