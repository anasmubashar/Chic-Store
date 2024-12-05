import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const weeklyItems = [
  {
    day: "Monday",
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=870",
  },
  {
    day: "Tuesday",
    image:
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=386",
  },
  {
    day: "Wednesday",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=386",
  },
  {
    day: "Thursday",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=870",
  },
  {
    day: "Friday",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=870",
  },
];

export function ModiWeek() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-light mb-8">Modiweek</h2>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {weeklyItems.map((item) => (
            <Card key={item.day} className="flex-none w-[250px]">
              <CardContent className="p-0 relative">
                <div className="relative aspect-[3/4]">
                  <img
                    src={item.image}
                    alt={item.day}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium">{item.day}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
