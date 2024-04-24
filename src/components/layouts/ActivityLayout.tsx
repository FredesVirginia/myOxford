import React, { useEffect, useRef } from "react";
import { useConnections } from "../../store/useConnections";
import { TBackgroundLayout } from "../../types/types";
import { ActivityBar, IActivityBarProps } from "../partials/ActivityBar";
import { ActivityFooter, IButtonProps } from "../partials/ActivityFooter";
import { ActivityHeader, IActivityHeader } from "../partials/ActivityHeader";
import { BackgroundLayout } from "./BackgroundLayout";

interface IProps {
  children?: React.ReactNode;
  theme?: TBackgroundLayout;
  acitivityHeader: IActivityHeader;

  // Propiedades de los botones
  nextProps?: IButtonProps;
  saveProps?: IButtonProps;

  // Propiedades del contenedor de la barra superior
  activityBarProps?: IActivityBarProps;

  primaryColor?: string;
}

export const ActivityLayout: React.FC<IProps> = ({
  children,
  theme,
  acitivityHeader,
  nextProps,
  saveProps,
  activityBarProps,
  primaryColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null); // Referencia al contenedor
  const { connections, setConnections } = useConnections();

  // Actualizar las flechas cuando se hace scroll
  useEffect(() => {
    const handleScroll = () => {
      if (connections.length === 0) return;
      setConnections([...connections]);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [connections]);

  return (
    <div className="overflow-y-hidden">
      <BackgroundLayout theme={theme}>
        <div className="h-screen w-full p-6 max-sm:p-3">
          <section
            className={`bg-white w-full h-full rounded-3xl 
          py-10 px-20 flex max-sm:py-5 max-sm:px-5
          flex-col gap-5`}
          >
            <ActivityBar style={{ backgroundColor: primaryColor }} {...activityBarProps} />
            <div ref={containerRef} className="flex flex-col gap-5 overflow-y-auto h-full">
              <ActivityHeader {...acitivityHeader} color={primaryColor} />
              <div className="flex-1 pb-5">{children}</div>
            </div>
            <ActivityFooter
              nextProps={{ style: { backgroundColor: primaryColor, ...nextProps?.style }, ...nextProps }}
              saveProps={{ style: { backgroundColor: primaryColor, ...saveProps?.style }, ...saveProps }}
            />
          </section>
        </div>
      </BackgroundLayout>
    </div>
  );
};
