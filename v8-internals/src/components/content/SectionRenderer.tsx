import type { Section } from '../../types';
import { TextBlock } from './TextBlock';
import { CodeBlock } from './CodeBlock';
import { InfoCard } from './InfoCard';
import { KeyConceptCard } from './KeyConceptCard';
import { ComparisonBlock } from './ComparisonBlock';
import { DiagramBlock } from './DiagramBlock';

interface SectionRendererProps {
  section: Section;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  return (
    <div>
      {section.content.map((block, i) => {
        switch (block.type) {
          case 'heading':
            if (block.level === 2)
              return <h2 key={i} className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-8">{block.text}</h2>;
            if (block.level === 3)
              return <h3 key={i} className="text-xl font-semibold text-[var(--text-primary)] mb-3 mt-6">{block.text}</h3>;
            return <h4 key={i} className="text-lg font-medium text-[var(--text-primary)] mb-2 mt-4">{block.text}</h4>;

          case 'text':
            return <TextBlock key={i} content={block.content} />;

          case 'code':
            return <CodeBlock key={i} language={block.language} code={block.code} caption={block.caption} />;

          case 'diagram':
            return <DiagramBlock key={i} diagramId={block.diagramId} caption={block.caption} />;

          case 'info':
            return <InfoCard key={i} variant={block.variant} title={block.title} content={block.content} />;

          case 'key-concept':
            return <KeyConceptCard key={i} title={block.title} content={block.content} />;

          case 'comparison':
            return (
              <ComparisonBlock
                key={i}
                leftTitle={block.leftTitle}
                rightTitle={block.rightTitle}
                leftContent={block.leftContent}
                rightContent={block.rightContent}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
