import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  faMobile,
  faGlobe,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { IMenuItem } from 'src/app/shared/components/menu/menu';

@Component({
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  contactInfo: IMenuItem[] = [
    {
      icon: faUser,
      name: 'Stavros Anastopoulos',
      value: 'Stavros Anastopoulos',
    },
    {
      icon: faMobile,
      name: '(+30) 6944858806',
      value: '(+30) 6944858806',
    },
    {
      icon: faEnvelope,
      name: 'anastopoulos.stavros@gmail.com',
      href: 'mailto:anastopoulos.stavros@gmail.com',
    },
    {
      icon: faLinkedin,
      name: 'in/stavrosanastopoulos',
      href: 'https://www.linkedin.com/in/stavrosanastopoulos',
    },
    {
      icon: faGithub,
      name: 'github.com/StavrosAnastopoulos',
      href: 'https://github.com/StavrosAnastopoulos',
    },
    {
      icon: faGlobe,
      name: 'stavrosanastopoulos.github.io/Portfolio/',
      href: 'https://stavrosanastopoulos.github.io/Portfolio/#/',
    },
  ];
}
