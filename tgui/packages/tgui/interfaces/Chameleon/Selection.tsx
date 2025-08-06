import { range } from 'common/collections';
import { BooleanLike } from 'common/react';
import { resolveAsset } from '../../assets';
import { useBackend } from '../../backend';
import { Box, Button, DmIcon, Icon, Stack } from '../../components';
import { Window } from '../../layouts';
import { InfernoNode } from 'inferno';

const ROWS = 5;
const COLUMNS = 9;

const getColumnsAmount = (mode: number): number => {
  if (mode === 0) {
    return 3;
  }
  return 9;
};

const BUTTON_DIMENSIONS = '64px';

type GridSpotKey = string;

const getGridSpotKey = (spot: [number, number]): GridSpotKey => {
  return `${spot[0]}/${spot[1]}`;
};

const SLOTS: Record<
  string,
  {
    displayName: string;
    gridSpot: GridSpotKey;
    image?: string;
    additionalComponent?: InfernoNode;
  }
> = {
  eyes: {
    displayName: 'eyewear',
    gridSpot: getGridSpotKey([1, 0]),
    image: 'inventory-glasses.png',
  },

  head: {
    displayName: 'headwear',
    gridSpot: getGridSpotKey([0, 1]),
    image: 'inventory-head.png',
  },

  mask: {
    displayName: 'mask',
    gridSpot: getGridSpotKey([1, 1]),
    image: 'inventory-mask.png',
  },

  right_ear: {
    displayName: 'right ear',
    gridSpot: getGridSpotKey([0, 2]),
    image: 'inventory-ears.png',
  },

  left_ear: {
    displayName: 'left ear',
    gridSpot: getGridSpotKey([1, 2]),
    image: 'inventory-ears.png',
  },

  jumpsuit: {
    displayName: 'uniform',
    gridSpot: getGridSpotKey([2, 0]),
    image: 'inventory-uniform.png',
  },

  suit: {
    displayName: 'suit',
    gridSpot: getGridSpotKey([2, 1]),
    image: 'inventory-suit.png',
  },

  gloves: {
    displayName: 'gloves',
    gridSpot: getGridSpotKey([2, 2]),
    image: 'inventory-gloves.png',
  },

  shoes: {
    displayName: 'shoes',
    gridSpot: getGridSpotKey([3, 1]),
    image: 'inventory-shoes.png',
  },

  id: {
    displayName: 'ID',
    gridSpot: getGridSpotKey([4, 1]),
    image: 'inventory-id.png',
  },

  belt: {
    displayName: 'belt',
    gridSpot: getGridSpotKey([4, 2]),
    image: 'inventory-belt.png',
  },

  back: {
    displayName: 'backpack',
    gridSpot: getGridSpotKey([3, 2]),
    image: 'inventory-back.png',
  },

  pda: {
    displayName: 'PDA',
    gridSpot: getGridSpotKey([3, 0]),
    image: 'inventory-pda.png',
  },
};

const ALTERNATIVE_SLOTS: Record<
  string,
  {
    displayName: string;
    gridSpot: GridSpotKey;
    image?: string;
    additionalComponent?: InfernoNode;
  }
> = {
  eyes: {
    displayName: 'eyewear',
    gridSpot: getGridSpotKey([1, 0]),
    image: 'inventory-glasses.png',
  },

  head: {
    displayName: 'headwear',
    gridSpot: getGridSpotKey([0, 1]),
    image: 'inventory-head.png',
  },

  mask: {
    displayName: 'mask',
    gridSpot: getGridSpotKey([1, 1]),
    image: 'inventory-mask.png',
  },

  right_ear: {
    displayName: 'right ear',
    gridSpot: getGridSpotKey([0, 2]),
    image: 'inventory-ears.png',
  },

  left_ear: {
    displayName: 'left ear',
    gridSpot: getGridSpotKey([1, 2]),
    image: 'inventory-ears.png',
  },

  jumpsuit: {
    displayName: 'uniform',
    gridSpot: getGridSpotKey([2, 0]),
    image: 'inventory-uniform.png',
  },

  suit: {
    displayName: 'suit',
    gridSpot: getGridSpotKey([2, 1]),
    image: 'inventory-suit.png',
  },

  gloves: {
    displayName: 'gloves',
    gridSpot: getGridSpotKey([2, 2]),
    image: 'inventory-gloves.png',
  },

  shoes: {
    displayName: 'shoes',
    gridSpot: getGridSpotKey([3, 1]),
    image: 'inventory-shoes.png',
  },

  id: {
    displayName: 'ID',
    gridSpot: getGridSpotKey([4, 1]),
    image: 'inventory-id.png',
  },

  belt: {
    displayName: 'belt',
    gridSpot: getGridSpotKey([4, 2]),
    image: 'inventory-belt.png',
  },

  back: {
    displayName: 'backpack',
    gridSpot: getGridSpotKey([4, 3]),
    image: 'inventory-back.png',
  },

  pda: {
    displayName: 'PDA',
    gridSpot: getGridSpotKey([4, 8]),
    image: 'inventory-pda.png',
  },
};

type Interactable = {
  interacting: BooleanLike;
  cantstrip: BooleanLike;
};

/**
 * Some possible options:
 *
 * null - No interactions, no item, but is an available slot
 * { interacting: 1 } - No item, but we're interacting with it
 * { icon: icon, name: name } - An item with no alternate actions
 *   that we're not interacting with.
 * { icon, name, interacting: 1 } - An item with no alternate actions
 *   that we're interacting with.
 */
type StripMenuItem =
  | null
  | Interactable
  | ({
      icon: string;
      icon_state: string;
      name: string;
      alternates?: Array<string>;
      selected?: boolean;
    } & Partial<Interactable>);

type StripMenuData = {
  items: Record<keyof typeof SLOTS, StripMenuItem>;
  name: string;
  show_mode: number;
  active_item: string;
};

export const SelectionMenu = (props, context) => {
  const { act, data } = useBackend<StripMenuData>(context);

  const gridSpots = new Map<GridSpotKey, string>();
  if (data.show_mode === 0) {
    for (const key of Object.keys(data.items)) {
      gridSpots.set(SLOTS[key].gridSpot, key);
    }
  } else {
    for (const key of Object.keys(data.items)) {
      gridSpots.set(ALTERNATIVE_SLOTS[key].gridSpot, key);
    }
  }

  const get_button_transparency = (item) => {
    if (item?.cantstrip) {
      return false;
    }
    if (item?.interacting) {
      return false;
    }
    return true;
  };

  const get_button_color = (item) => {
    if (item?.interacting) {
      return 'average';
    }
    return null;
  };

  const disable_background_hover = (item) => {
    if (item?.cantstrip) {
      return 'transparent';
    }
    return 'none';
  };

  return (
    <Stack
      vertical
      textAlign="center"
      style={{
        position: 'center',
      }}
    >
      {range(0, ROWS).map((row) => (
        <Stack.Item key={row}>
          <Stack fill>
            {range(0, getColumnsAmount(0)).map((column) => {
              const key = getGridSpotKey([row, column]);
              const keyAtSpot = gridSpots.get(key);

              if (!keyAtSpot) {
                return (
                  <Stack.Item
                    key={key}
                    style={{
                      width: BUTTON_DIMENSIONS,
                      height: BUTTON_DIMENSIONS,
                    }}
                  />
                );
              }
              const item = data.items[keyAtSpot];
              const slot = SLOTS[keyAtSpot];

              let alternateActions: Array<string> | undefined;

              let content;
              let tooltip;

              if (item === null) {
                tooltip = slot.displayName;
              } else if ('name' in item) {
                content = (
                  <DmIcon
                    icon={item.icon}
                    icon_state={item.icon_state}
                    height="100%"
                    width="100%"
                    imageSize={64}
                    style={{
                      '-ms-interpolation-mode': 'nearest-neighbor', // TODO: Remove with 516
                      'image-rendering': 'pixelated',
                      'vertical-align': 'middle',
                      'border-style': (item.selected && 'solid') || 'none',
                      'border-width': '2px',
                      'border-color': 'orange',
                    }}
                  />
                );
                tooltip = item.name;
              }
              //   } else if ('obscured' in item) {
              //     content = (
              //       <Icon
              //         name={item.obscured === ObscuringLevel.Completely ? 'ban' : 'eye-slash'}
              //         size={3}
              //         ml={0}
              //         mt={2.5}
              //         color="white"
              //         style={{
              //           'text-align': 'center',
              //           height: '100%',
              //           width: '100%',
              //         }}
              //       />
              //     );

              //     tooltip = `obscured ${slot.displayName}`;
              //   }

              //   if (item !== null) {
              //     if ('alternates' in item) {
              //       if (item.alternates !== null) {
              //         alternateActions = item.alternates;
              //       }
              //     }
              //   }

              return (
                <Stack.Item
                  key={key}
                  style={{
                    width: BUTTON_DIMENSIONS,
                    height: BUTTON_DIMENSIONS,
                  }}
                >
                  <Box
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Button
                      // onClick={() => {
                      //   act('use', {
                      //     key: keyAtSpot,
                      //   });
                      // }}
                      fluid
                      translucent={get_button_transparency(item)}
                      color={get_button_color(item)}
                      tooltip={tooltip}
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        padding: 0,
                        'background-color': disable_background_hover(item),
                      }}
                      onClick={() => {
                        act('select_item', {});
                      }}
                    >
                      {slot.image && (
                        <Box
                          as="img"
                          src={resolveAsset(slot.image)}
                          opacity={0.7}
                          style={{
                            position: 'absolute',
                            width: '32px',
                            height: '32px',
                            left: '50%',
                            top: '50%',
                            transform: 'translateX(-50%) translateY(-50%) scale(2)',
                          }}
                        />
                      )}

                      <Box style={{ position: 'relative' }}>{content}</Box>
                    </Button>
                  </Box>
                </Stack.Item>
              );
            })}
          </Stack>
        </Stack.Item>
      ))}
    </Stack>
  );
};
