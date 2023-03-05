import { Divider, Stack } from "@chakra-ui/react";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
const Airtable = ({ records }: { records: any }) => {
	return (
		<Stack>
			{records.map((record: any) => {
				let recordData = record.fields;
				return (
					<Stack direction={"column"} padding={5} key={record.id}>
						{Object.keys(recordData).map((key) => {
							return (
								<div key={`${record.id}${key}`}>
									<strong>{key}:</strong> {recordData[key]}
								</div>
							);
						})}
						<Divider />
					</Stack>
				);
			})}
		</Stack>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { slug } = context.params!;

	const { data } = await axios.get(
		`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${slug}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
			},
		}
	);
	console.log(data.records);
	return {
		props: {
			records: data.records,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = ["people", "locations"];

	const paths = slugs.map((slug) => ({
		params: { slug: slug },
	}));

	return { paths, fallback: false };
};

export default Airtable;
