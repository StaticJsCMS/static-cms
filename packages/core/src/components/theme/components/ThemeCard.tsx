import React, { useCallback, useLayoutEffect, useRef } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Card from '../../common/card/Card';
import CardActionArea from '../../common/card/CardActionArea';

import type { Theme } from '@staticcms/core/interface';
import type { FC } from 'react';

import './ThemeCard.css';

export const classes = generateClassNames('ThemeCard', [
  'root',
  'button',
  'content',
  'preview',
  'preview-appbar',
  'preview-content',
  'preview-text',
  'preview-action',
  'preview-sidebar',
  'preview-main',
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
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    onClick(theme.name);
  }, [onClick, theme.name]);

  useLayoutEffect(() => {
    ref.current?.style.setProperty('--preview-text-primary', theme.text.primary);
    ref.current?.style.setProperty('--preview-primary-main', theme.primary.main);
  }, [theme]);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick} className={classes.button}>
        <div ref={ref} className={classes.preview}>
          <div className={classes['preview-appbar']} />
          <div className={classes['preview-content']}>
            <div className={classes['preview-sidebar']} />
            <div className={classes['preview-main']}>
              <div className={classes['preview-card']} />
              <div className={classes['preview-card']}>
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
  );
};

export default ThemeCard;
