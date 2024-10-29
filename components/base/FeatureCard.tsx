import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

type Props = {
    title: string;
    description: string;
};
export default function CardFeature({ description, title }: Props) {
    return (
        <Card className="w-full bg-zinc-900 hover:bg-zinc-800 hover:border-primary transition hover:scale-105">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
        </Card>
    );
}
