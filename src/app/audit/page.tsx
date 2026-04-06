import Hero from "@/components/Hero";
import AuditsTable from "@/components/AuditsTable";

export default function Home() {
  return (
    <div className="flex-1 w-full p-4 pt-20 md:p-12 lg:p-16 max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
      <Hero />
      <AuditsTable />
    </div>
  );
}
