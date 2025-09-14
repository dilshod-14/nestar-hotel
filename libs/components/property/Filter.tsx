import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { PropertyLocation, PropertyType } from '../../enums/property.enum';
import { PropertiesInquiry } from '../../types/property/property.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { propertySquare } from '../../config';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: PropertiesInquiry;
	setSearchFilter: any;
	initialInput: PropertiesInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [propertyLocation, setPropertyLocation] = useState<PropertyLocation[]>(Object.values(PropertyLocation));
	const [propertyType, setPropertyType] = useState<PropertyType[]>(Object.values(PropertyType));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.roomsList?.length == 0) {
			delete searchFilter.search.roomsList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.bedsList?.length == 0) {
			delete searchFilter.search.bedsList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const propertyLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyStarSelectHandler = useCallback(
		async (number: number) => {
			try {
				if (number !== 0) {
					if (searchFilter?.search?.starsList?.includes(number)) {
						// mavjud bo'lsa — olib tashlaymiz
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									starsList: searchFilter?.search?.starsList?.filter((item: number) => item !== number),
								},
							})}`,
							undefined,
							{ scroll: false },
						);
					} else {
						// yo'q bo'lsa — qo'shamiz
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									starsList: [...(searchFilter?.search?.starsList || []), number],
								},
							})}`,
							undefined,
							{ scroll: false },
						);
					}
				} else {
					// 0 bosilsa — hammasini tozalash
					delete searchFilter?.search.starsList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search },
						})}`,
						undefined,
						{ scroll: false },
					);
				}

				console.log('propertyStarSelectHandler:', number);
			} catch (err: any) {
				console.log('ERROR, propertyStarSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyOptionSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.options?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('propertyOptionSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyOptionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyBedSelectHandler = useCallback(
		async (number: Number) => {
			try {
				if (number != 0) {
					if (searchFilter?.search?.bedsList?.includes(number)) {
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									bedsList: searchFilter?.search?.bedsList?.filter((item: Number) => item !== number),
								},
							})}`,
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									bedsList: searchFilter?.search?.bedsList?.filter((item: Number) => item !== number),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, bedsList: [...(searchFilter?.search?.bedsList || []), number] },
							})}`,
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, bedsList: [...(searchFilter?.search?.bedsList || []), number] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.bedsList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('propertyBedSelectHandler:', number);
			} catch (err: any) {
				console.log('ERROR, propertyBedSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/property?input=${JSON.stringify(initialInput)}`,
				`/property?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>PROPERTIES FILTER</div>;
	} else {
		return (
			<motion.div
				initial={{ opacity: 0, x: -30 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 1.2 }} // ⬅️ sekinroq (1.2 soniya)
			>
				<Stack className={'filter-main'}>
					<Stack className={'find-your-home'} mb={'40px'}>
						<Typography className={'title-main'}>Find Your Home</Typography>
						<Stack className={'input-box'}>
							<OutlinedInput
								value={searchText}
								type={'text'}
								className={'search-input'}
								placeholder={'What are you looking for?'}
								onChange={(e: any) => setSearchText(e.target.value)}
								onKeyDown={(event: any) => {
									if (event.key == 'Enter') {
										setSearchFilter({
											...searchFilter,
											search: { ...searchFilter.search, text: searchText },
										});
									}
								}}
								endAdornment={
									<>
										<CancelRoundedIcon
											onClick={() => {
												setSearchText('');
												setSearchFilter({
													...searchFilter,
													search: { ...searchFilter.search, text: '' },
												});
											}}
										/>
									</>
								}
							/>
							<img src={'/img/icons/search_icon.png'} alt={''} />
							<Tooltip title="Reset">
								<IconButton onClick={refreshHandler}>
									<RefreshIcon />
								</IconButton>
							</Tooltip>
						</Stack>
					</Stack>
					<Stack className={'find-your-home'} mb={'30px'}>
						<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
							Location
						</p>
						<Stack
							className={`property-location`}
							style={{ height: showMore ? '253px' : '115px' }}
							onMouseEnter={() => setShowMore(true)}
							onMouseLeave={() => {
								if (!searchFilter?.search?.locationList) {
									setShowMore(false);
								}
							}}
						>
							{propertyLocation.map((location: string) => {
								return (
									<Stack className={'input-box'} key={location}>
										<Checkbox
											id={location}
											className="property-checkbox"
											color="default"
											size="small"
											value={location}
											checked={(searchFilter?.search?.locationList || []).includes(location as PropertyLocation)}
											onChange={propertyLocationSelectHandler}
										/>
										<label htmlFor={location} style={{ cursor: 'pointer' }}>
											<Typography className="property-type">{location}</Typography>
										</label>
									</Stack>
								);
							})}
						</Stack>
					</Stack>
					<Stack className={'find-your-home'} mb={'30px'}>
						<Typography className={'title'}>Property Type</Typography>
						{propertyType.map((type: string) => (
							<Stack className={'input-box'} key={type}>
								<Checkbox
									id={type}
									className="property-checkbox"
									color="default"
									size="small"
									value={type}
									onChange={propertyTypeSelectHandler}
									checked={(searchFilter?.search?.typeList || []).includes(type as PropertyType)}
								/>
								<label style={{ cursor: 'pointer' }}>
									<Typography className="property_type">{type}</Typography>
								</label>
							</Stack>
						))}
					</Stack>
					<Stack className={'find-your-home'} mb={'30px'}>
						<Typography className={'title'}>Star Rating</Typography>
						<Stack className="button-group">
							{[1, 2, 3, 4, 5].map((num) => (
								<Button
									key={num}
									className={searchFilter?.search?.starsList?.includes(num) ? 'active' : ''}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										borderRadius: num === 1 ? '12px 0 0 12px' : num === 5 ? '0 12px 12px 0' : 0,
										border: searchFilter?.search?.starsList?.includes(num) ? '2px solid #181A20' : '1px solid #b9b9b9',
										borderLeft: num !== 1 ? 'none' : undefined,
										gap: '4px',
										padding: '6px 0',
									}}
									onClick={() => propertyStarSelectHandler(num)}
								>
									<span style={{ color: '#f7c948', fontSize: '18px' }}>⭐</span>
									<span style={{ fontSize: '12px', color: '#181a20' }}>{num}</span>
								</Button>
							))}
						</Stack>
					</Stack>

					<Stack className={'find-your-home'} mb={'30px'}>
						<Typography className={'title'}>Options</Typography>
						<Stack className={'input-box'}>
							<Checkbox
								id={'Barter'}
								className="property-checkbox"
								color="default"
								size="small"
								value={'propertyBarter'}
								checked={(searchFilter?.search?.options || []).includes('propertyBarter')}
								onChange={propertyOptionSelectHandler}
							/>
							<label htmlFor={'Barter'} style={{ cursor: 'pointer' }}>
								<Typography className="propert-type">Barter</Typography>
							</label>
						</Stack>
						<Stack className={'input-box'}>
							<Checkbox
								id={'Rent'}
								className="property-checkbox"
								color="default"
								size="small"
								value={'propertyRent'}
								checked={(searchFilter?.search?.options || []).includes('propertyRent')}
								onChange={propertyOptionSelectHandler}
							/>
							<label htmlFor={'Rent'} style={{ cursor: 'pointer' }}>
								<Typography className="propert-type">Rent</Typography>
							</label>
						</Stack>
					</Stack>

					<Stack className={'find-your-home'}>
						<Typography className={'title'}>Price Range</Typography>
						<Stack className="square-year-input">
							<input
								type="number"
								placeholder="$ min"
								min={0}
								value={searchFilter?.search?.pricesRange?.start ?? 0}
								onChange={(e: any) => {
									if (e.target.value >= 0) {
										propertyPriceHandler(e.target.value, 'start');
									}
								}}
							/>
							<div className="central-divider"></div>
							<input
								type="number"
								placeholder="$ max"
								value={searchFilter?.search?.pricesRange?.end ?? 0}
								onChange={(e: any) => {
									if (e.target.value >= 0) {
										propertyPriceHandler(e.target.value, 'end');
									}
								}}
							/>
						</Stack>
					</Stack>
				</Stack>
			</motion.div>
		);
	}
};

export default Filter;
