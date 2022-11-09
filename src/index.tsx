import * as React from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import App from './App';

import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider resetCSS>
			<ColorModeScript />
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
