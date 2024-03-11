import { Button, Paper, Title } from "@mantine/core";
import classes from "./CountryCard.module.css";

export type CountryCardProps = {
  image: string;
  title: string;
  action: string;
};

export function CountryCard({ image, title, action }: CountryCardProps) {
  return (
    <>
      <Paper
        p="xl"
        radius="md"
        style={{ backgroundImage: `url(${image})` }}
        className={classes.card}
      >
        <div>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </div>
        <Button>{action}</Button>
      </Paper>
    </>
  );
}
