import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/components.css';
import { Badge, Button, Card, Field, Heading, Stack, Text } from './components';

/** The starter's own page: each component once, so there is something to look at and to draw from. */
function App() {
  return (
    <main style={{ padding: 'var(--space-12)' }}>
      <Card style={{ maxWidth: 420 }}>
        <Stack gap={6}>
          <Stack gap={2}>
            <Badge tone="accent">Starter</Badge>
            <Heading level={2}>Sign in</Heading>
            <Text muted>A few plain parts to begin with.</Text>
          </Stack>
          <Field label="Email" type="email" placeholder="you@example.com" hint="We only use it to sign you in." />
          <Stack direction="row" gap={2}>
            <Button>Continue</Button>
            <Button variant="ghost">Cancel</Button>
          </Stack>
        </Stack>
      </Card>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
