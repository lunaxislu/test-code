import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="gap-4 overflow-hidden py-0">
      <Skeleton className="h-48 w-full rounded-none" />
      <CardHeader className="space-y-2 px-4">
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-2 px-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
      <CardFooter className="flex gap-2 px-4 pb-4">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
