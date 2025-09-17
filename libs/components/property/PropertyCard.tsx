import React, { useState } from 'react';
import { Stack, Typography, Box, Rating, IconButton } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar, useMutation } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { RATE_PROPERTY } from '../../../apollo/user/mutation';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const PropertyCard = (props: PropertyCardType) => {
	const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const [rateProperty] = useMutation(RATE_PROPERTY);
	const [ratingValue, setRatingValue] = useState<number | null>(null);

	const imagePath: string = property?.propertyImages[0]
		? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/banner/header1.svg';

	const handleRate = async (newValue: number | null) => {
  try {
    if (!user?._id) throw new Error(Message.NOT_AUTHENTICATED);
    if (!newValue) return;

    await rateProperty({
      variables: {
        input: {
          propertyId: property._id,
          rating: newValue,
        },
      },
    });

    setRatingValue(newValue);
    await sweetTopSmallSuccessAlert('Thanks for rating!', 1000);
  } catch (err: any) {
    await sweetErrorHandling(err);
  }
};


	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/property/detail',
							query: { id: property?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(property?.propertyPrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/property/detail',
									query: { id: property?._id },
								}}
							>
								<Typography>{property.propertyTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{property.propertyAddress}, {property.propertyLocation}
							</Typography>
						</Stack>
					</Stack>

					{/* ⭐️ Yulduzcha baholash */}
					<Stack sx={{ mt: 1 }}>
						<Rating
							name="property-rating"
							value={ratingValue ?? property.propertyRatingAvg ?? 0}
							onChange={(e, newValue) => handleRate(newValue)}
						/>
						<Typography variant="caption">
							{property.propertyRatingAvg?.toFixed(1) ?? 0} / 5 ⭐ ({property.propertyRatingCount ?? 0} votes)
						</Typography>
					</Stack>

					<Stack className="options">
						<Stack className="option">
							<img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography>
						</Stack>
					</Stack>

					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography className={property.propertyRent ? '' : 'disabled-type'}>Rent</Typography>
							<Typography className={property.propertyBarter ? '' : 'disabled-type'}>Barter</Typography>
						</Stack>
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{property?.propertyViews}</Typography>
								<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : property?.meLiked && property?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{property?.propertyLikes}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default PropertyCard;
