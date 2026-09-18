import { Blossom } from "@/components/Blossom";
import { Button, Container, Heading } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Blossom size={96} className="animate-float" />
      <Heading as="h1" className="mt-6 !text-4xl">
        That page drifted away.
      </Heading>
      <p className="mt-3 text-navy-700">Let&apos;s get you back to the good stuff.</p>
      <Button href="/" className="mt-8">
        Home
      </Button>
    </Container>
  );
}
