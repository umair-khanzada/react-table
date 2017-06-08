# react-table
A reusable table component for react.js

___

### props:

| Name | Type | Required | Details |
| ---- | ---- | -------- | ------- |
| tables | Array of Objects | True | In tables props each object generate it's own table according to it's configuration. |
| data | Array of Objects | True | Simple Array of Objects. |
<br />


**Note:** In tables props each object contain two keys **config, cssClass** and generate it's own table according to it's config key, 

#### props > tables:
| Name | Type | Required | Details |
| ---- | ---- | -------- | ------- |
| config | Array of Objects | True | Table configuration. |
| cssClass | String | false | CSS class for table. |
<br />

#### props > tables > config:

| Name | Type | Required | Details |
| ---- | ---- | -------- | ------- |
| key | String | true | A property name that must be exists in data objects. |
| label | String | true | Title for table heading. |
| icon | Node | false | A icon for sorting OR title for table heading, you can also bind an action on that icon. |
| nestedKey | String | false | As mention from the name it is use when you want to bind inner object property, for now it's support only one nesting. |
| modification | func | false | Through this function you can customize or replace value, modification have three arguments first key value, second data object, third rowIndex. |
<br />

#### A simple table example: 
```
<Table tables={
                    [
                        {
                              config: [
                                {
                                    key: 'name',
                                    label: 'NAME',
                                     icon: <i className="fa fa-user" aria-hidden="true"></i>,
                                      modification: (name, obj, index) => `Mr: ${name}`
                                }
                              ],
                              cssClass: 'css-class'
                        }
                    ]
                  }
           data={this.data}

        />       
```
