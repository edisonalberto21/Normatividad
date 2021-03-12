import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'NormatividadWebPartStrings';
import Normatividad from './components/Normatividad';
import { INormatividadProps } from './components/INormatividadProps';

export interface INormatividadWebPartProps {
  description: string;
  listName: string;
}

export default class NormatividadWebPart extends BaseClientSideWebPart<INormatividadWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INormatividadProps> = React.createElement(
      Normatividad,
      {
        description: this.properties.description,
        listName: this.properties.listName
      }
    );

    ReactDom.render(element, this.domElement);
    document.getElementById('Decretos').click()
    
  }

 

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
    
  }

  private validateTitle(value: string): string {   //Valida el campo por nulo o tamaño de caracteres
    
    if (value === null ||
      value.trim().length === 0) {
      return 'Este campo requiere información';
    }
   if (value.length > 100) {
      return 'Este campo no puede exceder los 100 caracteres';
    }
      return '';
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  onGetErrorMessage: this.validateTitle.bind(this),
                }),
                PropertyPaneTextField('listName', {
                  label: 'Nombre de lista',
                  onGetErrorMessage: this.validateTitle.bind(this),
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
