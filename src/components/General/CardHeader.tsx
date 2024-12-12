import { CardHeader } from "@nextui-org/react";
type Props = {
  header: string;
};
function CardTitle({ header }: Props) {
  return (
    <CardHeader className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-3">
        <h1 className="text-3xl font-semibold">{header}</h1>
      </div>
    </CardHeader>
  );
}

export default CardTitle;
