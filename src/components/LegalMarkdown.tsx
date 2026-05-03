import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type LegalMarkdownProps = {
  markdown: string;
};

export function LegalMarkdown({ markdown }: LegalMarkdownProps) {
  return (
    <div className="legal-markdown prose prose-neutral max-w-none dark:prose-invert prose-headings:font-sora prose-a:text-emerald-600 dark:prose-a:text-emerald-400">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
