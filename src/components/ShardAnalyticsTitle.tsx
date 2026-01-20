import { cn } from "@/utils/cn";

interface ShardAnalyticsTitleProps<Element extends React.ElementType = "h1"> {
	element?: Element;
	props?: React.ComponentPropsWithoutRef<Element>;
}

export function ShardAnalyticsTitle({
	element: Element = "h1",
	props,
}: ShardAnalyticsTitleProps) {
	return (
		<Element
			{...props}
			className={cn(
				"text-lg flex shrink flex-wrap gap-0.5 font-bold font-mono text-accent-foreground translate-y-1",
				props?.className ?? "",
			)}
		>
			<p className="text-black dark:text-white">Shard</p>
			<p className="text-[hsl(194 75% 55%)]">Analytics</p>
		</Element>
	);
}