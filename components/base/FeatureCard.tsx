import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

type Props = {
    title: string;
    description: string;
    icon: JSX.Element;
};
export default function CardFeature({ description, title, icon: Icon }: Props) {
    return (
        <Card className="w-full bg-zinc-900 hover:bg-zinc-800 hover:border-primary transition hover:scale-105">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex flex-col gap-2 text-primary">
                    {Icon} <span className="text-white">{title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
        </Card>
    );
}
