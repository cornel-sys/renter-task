import Link from "next/link";

export default async function Bikes() {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbzsnt3smq_cHTmet9EW6LRM3Hz2Yhg-8w9e7h3NjylM8wlBNYxMsfx3eGyFOLXfAefvMQ/exec"
  );
  const data = await res.json();
  return (
    <div className="grid grid-cols-3">
      {data.map((bikeId: string, index: number) => (
        <Link
          key={index}
          href={`/bike/${bikeId}`}
          className="px-8 py-4 m-2 border rounded-xl"
        >
          {bikeId}
        </Link>
      ))}
    </div>
  );
}
