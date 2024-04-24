interface ContainerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MatchItem: React.FC<ContainerItemProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`border p-2 rounded-lg  cursor-pointer ${props.className}`}>
      {children}
    </div>
  );
};
