import { Second, Third, Trophy, School } from 'assets';
import Image from 'next/image';

export default function Ranking() {
  return (
    <div className="flex gap-10 items-end">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32">
          <Image
            src={School}
            alt="Escola"
            className="w-32 h-32 rounded-full drop-shadow-lg border border-[#1474FF]/20 object-cover"
          />
          <h1 className="absolute bottom-0 w-full bg-[#203C84] text-white p-1 text-xs font-semibold rounded text-center transform translate-y-1/3">
            Escola Municipal Oswaldo Lima Filho
          </h1>
        </div>
        <div className="bg-[#1474FF] h-52 w-full rounded-lg py-3 px-8">
          <Image src={Second} alt="Second" className="w-16" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32">
          <Image
            src={School}
            alt="Escola"
            className="w-32 h-32 rounded-full drop-shadow-lg border border-[#1474FF]/20 object-cover"
          />
          <h1 className="absolute bottom-0 w-full bg-[#203C84] text-white p-1 text-xs font-semibold rounded text-center transform translate-y-1/3">
            Escola Municipal Oswaldo Lima Filho
          </h1>
        </div>
        <div className="bg-[#1474FF] h-60 w-full rounded-lg py-3 px-8">
          <Image src={Trophy} alt="Trophy" className="w-16" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32">
          <Image
            src={School}
            alt="Escola"
            className="w-32 h-32 rounded-full drop-shadow-lg border border-[#1474FF]/20 object-cover"
          />
          <h1 className="absolute bottom-0 w-full bg-[#203C84] text-white p-1 text-xs font-semibold rounded text-center transform translate-y-1/3">
            Escola Municipal Oswaldo Lima Filho
          </h1>
        </div>
        <div className="bg-[#1474FF] h-[11.25rem] w-full rounded-lg py-3 px-8">
          <Image src={Third} alt="Third" className="w-16" />
        </div>
      </div>
    </div>
  );
}