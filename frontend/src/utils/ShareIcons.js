import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import './Utils.css';

export default function ShareIcons() {
  return (
    <div className='share-icons'>
      <div className='icon-sec'>
        <FacebookShareButton
        // url={URL}
        // quote={data.realState.general.title}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </div>
      <div className='icon-sec'>
        <FacebookShareButton
        // url={URL}
        // quote={data.realState.general.title}
        >
          <FacebookMessengerIcon size={32} round={true} />
        </FacebookShareButton>
      </div>
      <div className='icon-sec'>
        <LinkedinShareButton
        // url={URL}
        // quote={data.realState.general.title}
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
      </div>
      <div className='icon-sec'>
        <PinterestShareButton
        // url={URL}
        // quote={data.realState.general.title}
        >
          <PinterestIcon size={32} round={true} />
        </PinterestShareButton>
      </div>
      <div className='icon-sec'>
        <RedditShareButton
        // url={URL}
        // quote={data.realState.general.title}
        >
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
      </div>
      <div className='icon-sec'>
        <TelegramShareButton
        // url={URL}
        // quote={data.realState.general.title}
        >
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
      </div>
      <div className='icon-sec'>
        <TwitterShareButton
        // url={URL}
        // quote={data.realState.general.title}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </div>
      <div className='icon-sec'>
        <WhatsappShareButton
        // url={URL}
        // quote={data.realState.general.title}
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
}
