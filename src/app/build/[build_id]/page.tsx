const BuildPage = ({ params }: { params: { build_id: string } }) => {
  return <span>{params.build_id}</span>;
};

export default BuildPage;
