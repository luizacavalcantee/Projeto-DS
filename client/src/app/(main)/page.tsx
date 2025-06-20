import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Header 
      buttonText="Sou ONG"
      secondaryButtonText="Sou Gestor Educacional"
      showSecondaryButton={true}
      />
    </div>
  );
}