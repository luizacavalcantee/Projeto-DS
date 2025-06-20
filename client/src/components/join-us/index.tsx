import { Button } from 'components/ui/button';

export default function JoinUs() {
  return (
    <div className="bg-white h-1/3 w-3/4 rounded items-center">
      <h1 className="text-3xl font-bold text-center mt-12 mb-10">
        Seja a transformação que inspira novas gerações!
      </h1>
      <div className="flex gap-4 justify-center">
        <Button>Sou ONG</Button>
        <Button variant="white">Sou Gestor Educacional</Button>
      </div>
    </div>
  );
}
