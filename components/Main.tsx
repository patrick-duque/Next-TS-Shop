interface Props {
  children: any;
}

const Main: React.FC<Props> = ({ children }) => {
  return <main className='py-3 px-0'>{children}</main>;
};

export default Main;
