import cn from 'classnames';
import LazyImage from 'components/LazyImage';
import s from './style.module.css';
import PluginIcon from 'public/icons/regular/puzzle-piece.svg';
import MaybeLink from 'components/MaybeLink';

export const LogoImage = ({ logo, style = 'pink' }) => (
  <div
    className={cn(s.logo, s[`${style}Logo`], {
      [s.square]: logo.width / logo.height < 1.7,
    })}
  >
    <div className={s.logoInner}>
      <LazyImage src={logo.url} />
    </div>
  </div>
);

export const PluginImagePlacehoder = () => (
  <div className={cn(s.logo, s[`grayLogo`], s.square)}>
    <div className={s.logoInner}>
      <PluginIcon height="100" />
    </div>
  </div>
);

export default function PluginBox({
  title,
  image,
  description,
  actions,
  details,
  href,
}) {
  return (
    <MaybeLink href={href} className={s.box}>
      {image}
      <div className={s.boxBody}>
        <div className={s.boxTitle}>{title}</div>
        <div className={s.boxDesc}>{description}</div>
        {actions && <div className={s.boxActions}>{actions}</div>}
        {details && <div className={s.boxDetails}>{details}</div>}
      </div>
    </MaybeLink>
  );
}
