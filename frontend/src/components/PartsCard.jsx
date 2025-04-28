
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane } from "lucide-react";


const PartCard = ({ name, partNumber, category, ownedBy, condition, location, lastInspection }) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 bg-blue-100 rounded-full">
          <Plane className="h-6 w-6 text-blue-700" />
        </div>
        <div>
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <p className="text-sm text-gray-500">Part #{partNumber}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium">{category}</span>
            
            <span className="text-gray-500">Owned By:</span>
            <span className="font-medium">{ownedBy}</span>
            
            <span className="text-gray-500">Location:</span>
            <span className="font-medium">{location}</span>
            
            <span className="text-gray-500">Last Inspection:</span>
            <span className="font-medium">{lastInspection}</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Badge variant={condition === "New" ? "default" : "secondary"}>
              {condition}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartCard;