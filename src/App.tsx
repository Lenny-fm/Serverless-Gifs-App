import { Flex, Text, Input, Button, useToast, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';

type GifType = {
	id: string;
	embed_url: string;
};

const GifCard = ({ URL }: { URL: string }): JSX.Element => <iframe title={URL} src={URL} allowFullScreen />;

const App = () => {
	const [value, setValue] = useState('');
	const [gifs, setGifs] = useState<GifType[]>([]);
	const toast = useToast();

	useEffect(() => {
		const fetchGiphy = () => {
			fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=4qj0Lw7P19Yqm8LctSPmB7FswgaGhriU&q=${value}&limit=25&offset=0&rating=g&lang=en`,
			)
				.then((response) => response.json())
				.then((data) => setGifs(data.data))
				.catch(() =>
					toast({
						title: 'Please try again',
						status: 'error',
						duration: 3000,
						isClosable: true,
					}),
				);
		};

		const timer = setTimeout(() => {
			fetchGiphy();
		}, 700);

		return () => {
			clearTimeout(timer);
		};
	}, [value, toast]);

	return (
		<Flex direction="column" align="center" w="100%" h="100%" bg="black">
			<Text
				mt="48px"
				bgGradient="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(193,176,15,1) 0%, rgba(0,212,255,1) 100%)"
				bgClip="text"
				fontWeight="extrabold"
				fontSize="32px"
			>
				Serverless Gifs App
			</Text>
			<Input
				placeholder="Search gifs"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				mt="48px"
				w="90%"
				maxW="600px"
				color="white"
				size="lg"
				focusBorderColor="green.300"
			/>
			<Grid mt="80px" templateColumns="repeat(3, 1fr)" gap={8}>
				{gifs.map((gif) => (
					<GifCard key={gif.id} URL={gif.embed_url} />
				))}
			</Grid>
		</Flex>
	);
};

export default App;
