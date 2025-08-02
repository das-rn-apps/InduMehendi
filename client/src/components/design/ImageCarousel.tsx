// src/components/design/ImageCarousel.tsx
interface Image {
    url: string;
    altText?: string;
}

export const ImageCarousel = ({ images }: { images: Image[] }) => {
    if (images.length === 0) return null;

    return (
        <div className="w-full overflow-x-auto flex space-x-4">
            {images.map((img, i) => (
                <img
                    key={i}
                    src={img.url}
                    alt={img.altText || `Design image ${i + 1}`}
                    className="w-64 h-64 object-cover rounded shadow shrink-0"
                />
            ))}
        </div>
    );
};
