import { IProduct } from 'boundless-api-client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ProductsList from '../components/ProductsList';
import MainLayout from '../layouts/Main';
import { apiClient } from '../lib/api';
import { makeAllMenus } from '../lib/menu';
import VerticalMenu from '../components/VerticalMenu';
import { IMenuItem } from '../@types/components';
import SwiperSlider from '../components/SwiperSlider';
import cliffImg from '../assets/cliff_1.jpg';
import cliff2Img from '../assets/cliff_2.jpg';
import CoverTextInCenter from '../components/CoverTextInCenter';
import bgImg from '../assets/cover-bg.jpeg';
import bgPortraitImg from '../assets/cover-bg-portrait.jpg';
import ProductsSliderByQuery from '../components/ProductsSliderByQuery';

async function dynamicData() {
	const categoryTree = await apiClient.catalog.getCategoryTree({ menu: 'category' });
	const { products } = await apiClient.catalog.getProducts({ collection: ['main-page'], sort: 'in_collection' });

	const menus = makeAllMenus({ categoryTree });
	return {
		products,
		...menus
	}
	;
}

export default async function IndexPage() {
	const { mainMenu, footerMenu, products }: any = await dynamicData();
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className='container'>
				<MainPageSlider />
				<div className='row'>
					<nav className='col-lg-3 d-none d-lg-block'>
						{mainMenu && <VerticalMenu menuList={mainMenu} />}
					</nav>
					<div className='col-lg-9 col-md-12'>
						<h1 className='page-heading page-heading_h1  page-heading_m-h1'>Boundless store</h1>
						{products && <ProductsList products={products} query={{}} />}
					</div>
				</div>
				<div className='container'>
					<h2 className='page-heading page-heading_h1  page-heading_m-h1'>Cover example:</h2>
				</div>
			</div>
			<CoverTextInCenter
				showChevronDown
				img={bgImg.src}
				imgPortrait={bgPortraitImg.src}
				content={{
					intro: 'Intro',
					head: 'Main header',
					subHead: 'subheader'
				}}
				shadow={{
					opacity: 0.5,
					backgroundColor: '#000'
				}}
				link={'http://google.com'}
			/>
			<div className='container'>
				<h2 className='page-heading page-heading_h1  page-heading_m-h1'>Products carousel:</h2>
				<ProductsSliderByQuery
					query={{ collection: ['main-page'], sort: 'in_collection' }}
					title={'Collection title'}
					wrapperClassName='page-block'
				/>
			</div>
		</MainLayout>
	);
}

// export const getServerSideProps: GetServerSideProps<IIndexPageProps> = async () => {
// 	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});
// 	const {products} = await apiClient.catalog.getProducts({collection: ['main-page'], sort: 'in_collection'});

// 	const menus = makeAllMenus({categoryTree});

// 	return {
// 		props: {
// 			products,
// 			...menus
// 		}
// 	};
// };

interface IIndexPageProps {
	products: IProduct[];
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}

function MainPageSlider() {
	const slides = [
		{
			'img': cliffImg.src,
			'link': '',
			'caption': 'Three things cannot be long hidden: The Sun, The Moon, and The Truth.',
			'captionPosition': 'center',
			'useFilling': true,
			'fillingColor': '#000000',
			'fillingOpacity': 0.40
		},
		{
			'img': cliff2Img.src,
			'link': '',
			'caption': 'Pray not for easy lives, pray to be stronger men.',
			'captionPosition': null,
			'useFilling': true,
			'fillingColor': '#000000',
			'fillingOpacity': 0.4
		}
	];

	return (
		<SwiperSlider
			showPrevNext
			roundCorners
			pagination='progressbar'
			size={'large'}
			slides={slides}
			className={'mb-4'}
		/>
	);
}