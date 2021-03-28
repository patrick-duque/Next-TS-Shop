import Head from 'next/head';

interface Props {
	title: string;
}

const CustomHead: React.FC<Props> = ({ title }) => {
	return (
		<Head>
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			<meta name='keywords' content={title} />
			<meta charSet='utf-8' />
			<title>{title}</title>
		</Head>
	);
};

export default CustomHead;
