import { useState } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const carouselData: CarouselItem[] = [
    {
        id: 2,
        title: "Viaje a San Antonio",
        description: "Explora San Antonio con nuestro servicio de buses de lujo.",
        imageUrl: "/san-antonio.jpg",
    },
    {
        id: 1,
        title: "Viaje a Laredo",
        description: "Disfruta de un cómodo viaje desde Dallas a Laredo.",
        imageUrl: "/laredo.jpg",
    },
    {
        id: 3,
        title: "Viaje a Houston",
        description: "¡Reserva tu viaje a Houston ahora y vive la experiencia!",
        imageUrl: "/houston.jpg",
    },
];

function Carousel() {

  const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
        );
    };
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
        );
    };

  return (
    <div className="relative w-full">
        <div className="flex justify-between items-center">
            <button
            onClick={prevSlide}
            className="text-primary hover:bg-gray-300 mr-2 rounded-4xl p-2 cursor-pointer"
            >
            <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <div className="w-full">
            {/* Mostrar el contenido del carrusel actual */}
            <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                src={carouselData[currentIndex].imageUrl}
                alt={carouselData[currentIndex].title}
                className="w-full h-64 object-cover"
                />
                <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold">
                    {carouselData[currentIndex].title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                    {carouselData[currentIndex].description}
                </CardDescription>
                </CardContent>
            </Card>
            </div>

            <button
            onClick={nextSlide}
            className="text-primary hover:bg-gray-300 ml-2 rounded-4xl p-2 cursor-pointer"
            >
            <ChevronRightIcon className="h-6 w-6" />
            </button>
        </div>
    </div>
  );
};

export default Carousel;