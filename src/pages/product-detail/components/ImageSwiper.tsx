import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ImageSwiperProps = {
  images: string[];
  alt: string;
};

const ImageSwiper = ({ images, alt }: ImageSwiperProps) => {
  return (
    <Carousel className="mx-auto w-full max-w-lg px-10">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={`${src}-${index}`}>
            <div className="overflow-hidden rounded-md border bg-muted">
              <img
                src={src}
                alt={`${alt} 이미지 ${index + 1}`}
                className="h-[360px] w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageSwiper;
