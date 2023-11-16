import React, { useCallback, useState } from 'react';

import useRefWithCallback from '@staticcms/core/lib/hooks/useRefWithCallback';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectTheme } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Card from '../../common/card/Card';
import CardActionArea from '../../common/card/CardActionArea';
import { StaticCmsIcon } from '../../images/_index';
import ThemeManager from '../ThemeManager';

import type { Theme } from '@staticcms/core';
import type { FC } from 'react';

import './ThemeCard.css';

export const classes = generateClassNames('ThemeCard', [
  'root',
  'active',
  'button',
  'content',
  'preview',
  'preview-appbar',
  'preview-logo-wrapper',
  'preview-logo',
  'preview-custom-logo',
  'preview-breadcrumbs',
  'preview-appbar-actions',
  'preview-avatar',
  'preview-content',
  'preview-primary-button',
  'preview-secondary-button',
  'preview-text',
  'preview-sidebar',
  'preview-main',
  'preview-main-actions',
  'preview-error-button',
  'preview-warning-button',
  'preview-info-button',
  'preview-success-button',
  'preview-card',
  'preview-collection-row',
  'preview-collection-highlight',
]);

export interface ThemeCardProps {
  currentTheme: string;
  theme: Theme;
  onClick: (themeName: string) => void;
}

const ThemeCard: FC<ThemeCardProps> = ({ theme, onClick }) => {
  const [element, setElement] = useState<HTMLDivElement>();
  const ref = useRefWithCallback<HTMLDivElement>(setElement);

  const themeName = useAppSelector(selectTheme);
  const config = useAppSelector(selectConfig);

  const handleClick = useCallback(() => {
    onClick(theme.name);
  }, [onClick, theme.name]);

  return (
    <ThemeManager theme={theme} element={element}>
      <Card
        className={classNames(
          classes.root,
          theme.name.toLowerCase() === themeName && classes.active,
        )}
      >
        <CardActionArea onClick={handleClick} className={classes.button}>
          <div ref={ref} className={classes.preview}>
            <div className={classes['preview-appbar']}>
              <div className={classes['preview-breadcrumbs']}>
                <div className={classes['preview-logo-wrapper']}>
                  {config?.logo_url ? (
                    <div
                      className={classNames(
                        classes['preview-logo'],
                        classes['preview-custom-logo'],
                      )}
                      style={{ backgroundImage: `url('${config.logo_url}')` }}
                    />
                  ) : (
                    <StaticCmsIcon className={classes['preview-logo']} />
                  )}
                </div>
                <div className={classes['preview-text']} />
                <div className={classes['preview-text']} />
              </div>
              <div className={classes['preview-appbar-actions']}>
                <div className={classes['preview-primary-button']} />
                <div className={classes['preview-avatar']} />
              </div>
            </div>
            <div className={classes['preview-content']}>
              <div className={classes['preview-sidebar']}>
                <div className={classes['preview-primary-button']} />
                <div className={classes['preview-secondary-button']} />
                <div className={classes['preview-secondary-button']} />
                <div className={classes['preview-secondary-button']} />
              </div>
              <div className={classes['preview-main']}>
                <div className={classes['preview-main-actions']}>
                  <div className={classes['preview-error-button']} />
                  <div className={classes['preview-warning-button']} />
                  <div className={classes['preview-info-button']} />
                  <div className={classes['preview-success-button']} />
                </div>
                <div className={classes['preview-card']}>
                  <div className={classes['preview-collection-row']} />
                  <div
                    className={classNames(
                      classes['preview-collection-row'],
                      classes['preview-collection-highlight'],
                    )}
                  />
                  <div className={classes['preview-collection-row']} />
                  <div className={classes['preview-collection-row']} />
                  <div className={classes['preview-collection-row']} />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.content}>{theme.name}</div>
        </CardActionArea>
      </Card>
    </ThemeManager>
  );
};

export default ThemeCard;
