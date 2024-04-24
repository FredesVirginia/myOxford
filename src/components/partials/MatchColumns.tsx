import React, { useEffect, useState } from "react";
import Xarrow from "react-xarrows";
import {
  createSelectedItem,
  getRandomColor,
  getStringId,
  hasId,
  hasMatchingEndId,
  isObject,
} from "../../helpers/helpersMatchColumns";
import { useConnections } from "../../store/useConnections";
import { TitleColumn } from "../items/TitleColumn";
import { MatchList } from "../lists/MatchList";

export interface IItem {
  id: string;
  index: number;
}

export interface IConnection {
  start: number | null; // campo que indica el INICIO de la conexion
  end: string | null; // campo que indica el FINAL de la conexion
  color: string | null; // campo que indica el COLOR de la conexion
}
interface IStartList<StartType> {
  list: StartType[];
  renderItem: (item: StartType, selectedItem?: StartType) => React.ReactNode;
  title?: string;
}

interface IEndList<EndType> {
  list: EndType[];
  renderItem: (item: EndType, selectedDescription?: EndType) => React.ReactNode;
  title?: string;
}
interface IProps<StartType, EndType> {
  start: IStartList<StartType>;
  end: IEndList<EndType>;
  showHeader?: boolean;
  titleProps?: React.HTMLAttributes<HTMLDivElement>;
  listProps?: React.HTMLAttributes<HTMLDivElement>;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  containerItemProps?: React.HTMLAttributes<HTMLDivElement>;
  onConnectionsChange?: (connections: { start: StartType; end: EndType }[]) => void;
  connections?: { start: StartType; end: EndType }[];
}

export const MatchColumns = <StartType, EndType>({
  start,
  end,
  titleProps,
  showHeader,
  containerProps,
  containerItemProps,
  listProps,
  connections: links = [],
  onConnectionsChange,
}: IProps<StartType, EndType>) => {
  const { list: itemList, renderItem: renderLeftItem, title: leftTitle = "Items" } = start;
  const { list: descriptionList, renderItem: renderRightItem, title: rightTitle = "Descriptions" } = end;

  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<IItem | null>(null);
  // const [connections, setConnections] = useState<IConnection[]>([]);
  const { connections, setConnections } = useConnections();
  const [connection, setConnection] = useState<IConnection | null>(null);

  const refs = React.useRef<React.RefObject<HTMLDivElement>[]>(itemList.map(() => React.createRef()));

  const handleSelectItem = (item: unknown, index: number) => {
    if (!isObject(item) && !hasId(item)) {
      return;
    }

    const newSelectedItem: IItem = createSelectedItem(item, index);

    setSelectedItem(newSelectedItem);
  };

  const handleSelectDescription = (description: unknown, index: number) => {
    if (!isObject(description) && !hasId(description)) {
      return;
    }

    const newSelectedDescription: IItem = createSelectedItem(description, index);

    setSelectedDescription(newSelectedDescription);
  };

  // Efecto para la creacion de una nueva conexion cuando se haya seleccionado un item y una descripción
  useEffect(() => {
    if (selectedItem && selectedDescription) {
      const newConnection: IConnection = {
        start: selectedItem.index,
        end: selectedDescription.id,
        color: getRandomColor(),
      };
      setConnection(newConnection);
      setSelectedDescription(null);
      setSelectedItem(null);
    }
  }, [selectedItem, selectedDescription]);

  // Efecto para remover las conexiones relacionadas con la nueva conexion
  useEffect(() => {
    if (connection) {
      const filteredConnections = connections.filter(
        (prevConnection) => prevConnection.start !== connection.start && prevConnection.end !== connection.end
      );

      const newConnections = [...filteredConnections, connection];
      setConnections(newConnections);
      setConnection(null);
    }
  }, [connection]);

  // Efecto pra asesgurarse de que todas las conexiones tengan un color
  useEffect(() => {
    const connection = connections.find((connection) => !connection.color);
    if (connection) {
      const index = connections.indexOf(connection);
      const newConnections = [...connections];
      newConnections[index].color = getRandomColor();
      setConnections(newConnections);
    }
  }, [connections]);

  // Efecto para devolver las conexiones creadas al componente padre, devolvemos un array de objetos
  // con el formato { start: StartType, end: EndType }
  useEffect(() => {
    if (onConnectionsChange) {
      const newConnections: {
        start: StartType;
        end: EndType;
      }[] = connections.map((connection) => ({
        start: itemList[connection.start!],
        end: descriptionList.find((description) => hasMatchingEndId(connection, description))!,
      }));
      onConnectionsChange(newConnections);
    }
  }, [connections, onConnectionsChange, descriptionList, itemList]);

  // Efecto para inicialiar las conexiones cuando se recibe un array de objetos
  useEffect(() => {
    if (links.length > 0) {
      const newConnections: IConnection[] = links.map((link) => ({
        start: itemList.findIndex((item) => hasId(item) && getStringId(item) === getStringId(link.start)),
        end: getStringId(link.end),
        color: getRandomColor(),
      }));
      setConnections(newConnections);
    }
  }, [links]);

  return (
    <>
      <div
        {...containerProps}
        className={`container-match-columns h-auto max-sm:w-screen 
        grid grid-cols-[repeat(3,minmax(100px,1fr))] gap-2 p-5
        place-content-center rounded-xl shadow-lg w-full ${containerProps?.className} `}
      >
        {showHeader ? <TitleColumn {...titleProps}>{leftTitle}</TitleColumn> : <div></div>}
        <div className="relative"></div>
        {showHeader ? <TitleColumn {...titleProps}>{rightTitle}</TitleColumn> : <div></div>}

        {/* ITEMS */}
        <MatchList {...listProps}>
          {itemList.map((item: unknown, index) => {
            if (isObject(item) && hasId(item)) {
              const id = getStringId(item);
              return (
                <div
                  {...containerItemProps}
                  key={id}
                  onClick={() => handleSelectItem(item, index)}
                  className={`flex flex-row items-center ${containerItemProps?.className}`}
                >
                  <div className="w-full">{renderLeftItem(item as never, selectedItem as never)}</div>
                  <div ref={refs.current[index]}></div>
                </div>
              );
            }
          })}
        </MatchList>
        <div className="relative"></div>

        {/* DESCRIPTIONS */}
        <MatchList {...listProps}>
          {descriptionList.map((item: unknown, index) => {
            if (isObject(item) && hasId(item)) {
              const id = getStringId(item);
              return (
                <div
                  {...containerItemProps}
                  key={index}
                  onClick={() => handleSelectDescription(item, index)}
                  className={`flex flex-row items-center ${containerItemProps?.className}`}
                >
                  <div id={id.toString()}></div>
                  <div className="w-full">{renderRightItem(item as never, selectedDescription as never)}</div>
                </div>
              );
            }
          })}
        </MatchList>
      </div>

      {/* Renderizar las conexiones */}
      {connections.map((connection, index) => {
        return (
          connection.end !== null &&
          connection.start !== null && (
            <Xarrow
              key={index}
              curveness={0.5}
              start={refs.current[connection.start]}
              end={connection.end}
              headShape={"circle"}
              headSize={4}
              showTail
              tailShape={"circle"}
              tailSize={4}
              color={"#A366FF"}
              path="straight"
              strokeWidth={6}
              startAnchor={{ position: "auto", offset: { x: 5, y: 0 } }}
              endAnchor={{ position: "auto", offset: { x: -5, y: 0 } }}
            />
          )
        );
      })}
    </>
  );
};
