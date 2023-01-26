import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useGetExpiresTimesQuery } from '../store/apis/Ad/AdExpire';
import MySpinner from '../utils/MySpinner';
import ServerErrorMessage from '../error/ServerErrorMessage';
import ErrorMessage from '../error/ErrorMessage';
import { useGetAllAdsQuery } from '../store/apis/Ad/Ad';
import './Ads.css';

const Ads = () => {
  const { isLoading, isSuccess, isError, error, data, refetch } =
    useGetExpiresTimesQuery();

  const {
    isSuccess: allAdsIsSuccess,
    data: allAdsData,
    refetch: addAdsRefetch,
  } = useGetAllAdsQuery();

  const dataFormatter = (dateValue) =>
    formatDistance(
      new Date(dateValue),
      new Date(Date.now()),
      { locale: ar } // Pass the locale as an option
    );

  useEffect(() => {
    async function deleteOldAds(ownerId, adId) {
      await axios({
        method: 'DELETE',
        url: '/api/v1/adExpire',
        data: { ownerId, adId, adExpireId: data.adExpire[0]._id },
      })
        .then(() => {
          refetch();
        })
        .catch((err) => ServerErrorMessage(err));
    }

    async function updateAds(id) {
      await axios({
        method: 'PUT',
        url: '/api/v1/adExpire',
        data: { id: data.adExpire[0]._id },
      })
        .then(() => {
          refetch();
        })
        .catch((err) => ServerErrorMessage(err));
    }

    window.setInterval(() => {
      if (isSuccess && allAdsIsSuccess) {
        if (
          data?.adExpire[0]?.ads > 0 &&
          data?.adExpire[0]?.ads.length < 2 &&
          allAdsData.length > 0
        ) {
          if (
            data?.adExpire[0]?.ads.ad._id.toString() !==
            allAdsData[0]._id.toString()
          ) {
            updateAds();
          }
        } else if (data?.adExpire[0]?.ads === 0 && allAdsData.length > 0) {
          updateAds();
        }

        data?.adExpire[0]?.ads.forEach((foundAd) => {
          if (dataFormatter(foundAd.createdAt) === 'يوم واحد') {
            deleteOldAds(foundAd.ad.owner, foundAd.ad._id);
          }
        });
        refetch();
        addAdsRefetch();
      }
    }, 43200000);
    if (isError) return toast.error(ServerErrorMessage(error));
  }, [
    addAdsRefetch,
    allAdsData,
    allAdsIsSuccess,
    data,
    error,
    isError,
    isSuccess,
    refetch,
  ]);

  return (
    <section className='ads-sec'>
      {isLoading ? (
        <MySpinner />
      ) : data.adExpire[0]?.ads.length <= 0 ? (
        <ErrorMessage>لا يوجد إعلانات حتى الأن</ErrorMessage>
      ) : isSuccess && data.adExpire[0]?.ads.length > 0 ? (
        <>
          {data.adExpire[0].ads.length < 2 &&
            data.adExpire[0].ads.length !== 0 && (
              <Card className='mb-3 clickable-card'>
                <Card.Img src={data.adExpire[0].ads[0].ad.adInfo.mainImage} />
                <Card.Body>
                  <Card.Text>
                    {data.adExpire[0].ads[0].ad.adInfo.description}
                  </Card.Text>{' '}
                  {/* <Card.Text>
                    {dataFormatter(data.adExpire[0].ads[0].createdAt)}
                  </Card.Text> */}
                </Card.Body>
              </Card>
            )}

          {data.adExpire[0].ads.length >= 2 && (
            <>
              <Card className='mb-3 clickable-card'>
                <Card.Img src={data.adExpire[0]?.ads[0].ad.adInfo.mainImage} />
                <Card.Body>
                  <Card.Text>
                    {data.adExpire[0].ads[0]?.ad.adInfo.description}
                  </Card.Text>{' '}
                  {/* <Card.Text>
                    {dataFormatter(data.adExpire[0].ads[0].ad.createdAt)}
                  </Card.Text> */}
                </Card.Body>
              </Card>
              <Card className='mb-3'>
                <Card.Img src={data.adExpire[0]?.ads[1].ad.adInfo.mainImage} />
                <Card.Body>
                  <Card.Text>
                    {data.adExpire[0]?.ads[1].ad.adInfo.description}
                  </Card.Text>
                  {/* <Card.Text>
                    {dataFormatter(data.adExpire[0].ads[1].createdAt)}
                  </Card.Text> */}
                </Card.Body>
              </Card>
            </>
          )}
        </>
      ) : (
        <ErrorMessage>لا يوجد إعلانات حتى الأن</ErrorMessage>
      )}
    </section>
  );
};

export default Ads;
