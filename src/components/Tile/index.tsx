import type { CSSProperties, ReactElement } from "react";
import type { Tile as TileModel } from "../../game/types";
import styles from "./index.module.css";

interface TileProps {
  tile: TileModel;
}

export default function Tile({ tile }: TileProps): ReactElement {
  const tier = styles[`v${Math.min(tile.value, 4096)}`] || styles.v4096;
  const classes = [styles.tile, tier];
  if (tile.isNew) {
    classes.push(styles.spawn);
  }
  if (tile.mergedFrom) {
    classes.push(styles.merge);
  }
  const position = { "--row": tile.row, "--col": tile.col } as CSSProperties;

  return (
    <div className={classes.join(" ")} style={position}>
      {tile.value}
    </div>
  );
}
