var Dashboard = function () {
        var me = this;
        me.gridEl = null;
        me.chartEl = null;
        me.token = null;//token;
        me.initialize = function (data) {
            var columns = me.getGridColumns();
            var fields = me.getGridFields();
            var source =
                {
                    datatype: "json",
                    datafields: fields,
                    localData: data
                };
            me.createJqxGrid('jqxGrid', source, columns);
            me.createJqxChart('jqxChart', source);
        };
        me.getGridFields = function () {
            var datafields = [
                {name: 'id', type: 'number'},
                {name: 'company', type: 'string'},
                {name: 'week_of', type: 'date'},
                {name: 'vr_units', type: 'float'},
                {name: 'tph', type: 'number'}
            ];
            return datafields;
        };
        me.getGridColumns = function () {
            var columns = [

                {
                    text: "Company",
                    datafield: 'company',
                    filtertype: 'input',
                    cellsalign: 'center',
                    align: 'center',

                },
                {
                    text: "Week",
                    datafield: 'week_of',
                    filtertype: 'range',
                    cellsformat: 'MMM, dd,yyyy',
                    cellsalign: 'center', align: 'center'

                },
                {
                    text: 'vr_units',
                    datafield: 'vr_units',
                    align: 'center',
                    filtertype: 'number',
                    cellsalign: 'center',
                    cellsformat: 'f6',
                    aggregates: ["sum"],
                },

                {
                    text: 'tph',
                    datafield: 'tph',
                    align: 'center',
                    filtertype: 'number',
                    cellsalign: 'center',
                }
            ];
            return columns;
        };
        me.createJqxGrid = function (divID, source, columns) {
            me.gridEl = $('#' + divID);
            var theme = '';
            var toThemeProperty = function (className) {
                return className + " " + className + "-" + theme;
            };
            var grid = me.gridEl.jqxGrid(
                {
                    source: source,
                    width: "100%",
                    theme: "arctic",
                    sortable: true,
                    showfilterrow: true,
                    filterable: true,
                    groupable: true,
                    columnsResize: true,
                    altrows: true,
                    enabletooltips: true,
                    columnsreorder: true,
                    // groups: 'week_of',
                    // showstatusbar: true,
                    // statusbarheight: 25,
                    // showaggregates: true,
                    columns: columns,
                    ready: function () {
                        me.gridEl.jqxGrid('addgroup', 'week_of');
                        me.gridEl.jqxGrid('expandgroup', 0);
                    },

                });
            // $(btnId).click(function () {
            //     me.gridEl.jqxGrid('exportdata', 'xls', 'Release_' + me.projectId);
            // });

        };
        me.createJqxChart = function (divID, source) {
            var sampleData = me.create_data_for_chart(source.localData);
            me.chartEl = $('#' + divID);
            var dataAdapter = new $.jqx.dataAdapter(sampleData, {
                async: false,
                autoBind: true,
                loadError: function (xhr, status, error) {
                    alert('Error loading "' + source.url + '" : ' + error);
                }
            });
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            // prepare jqxChart settings
            var settings = {
                title: "Amazon Vendor Return",
                description: "Month Wise Vendor Return",
                enableAnimations: true,
                showLegend: true,
                padding: {left: 10, top: 5, right: 10, bottom: 5},
                titlePadding: {left: 50, top: 0, right: 0, bottom: 10},
                source: dataAdapter,
                xAxis:
                    {
                        dataField: 'Day',
                        formatFunction: function (value) {
                            return value.getDate() + '-' + months[value.getMonth()] + '-' + value.getFullYear();
                        },
                        type: 'date',
                        baseUnit: 'month',
                        valuesOnTicks: true,
                        minValue: '01-09-2018',
                        maxValue: '01-04-2019',
                        tickMarks: {
                            visible: true,
                            interval: 1,
                            color: '#BCBCBC'
                        },
                        unitInterval: 1,
                        gridLines: {
                            visible: true,
                            interval: 3,
                            color: '#BCBCBC'
                        },
                        labels: {
                            angle: -45,
                            rotationPoint: 'topright',
                            offset: {x: 0, y: -25}
                        }
                    },
                valueAxis:
                    {
                        visible: true,
                        title: {text: 'VR Units<br>'},
                        tickMarks: {color: '#BCBCBC'}
                    },
                colorScheme: 'scheme04',
                seriesGroups:
                    [
                        {
                            type: 'line',
                            series: [
                                {dataField: 'SMF1', displayText: 'SMF1'},
                                {dataField: 'OAK4', displayText: 'OAK4'},
                                {dataField: 'FAT1', displayText: 'FAT1'},
                                {dataField: 'LGB3', displayText: 'LGB3'},
                                {dataField: 'MSP1', displayText: 'MSP1'},
                                {dataField: 'CMH1', displayText: 'CMH1'}
                            ]
                        }
                    ]
            };
            me.chartEl.jqxChart(settings);
        }
        me.create_data_for_chart = function (data) {
            var groupedData = _.groupBy(data, function (d) {
                return d.week_of
            });
            var final_data = [];
            for (var key in groupedData) {
                var obj = {Day: new Date(key)};
                var cmp = groupedData[key]
                var cmp_group = _.groupBy(cmp, function (d) {
                    return d.company
                });
                for (var k in cmp_group) {
                    obj[k] = cmp_group[k][0]['vr_units']
                }
                final_data.push(obj)
            }
            var d = [
                {Day: 'Monday', Keith: 30, Erica: 15, George: 25},
                {Day: 'Tuesday', Keith: 25, Erica: 25, George: 30},
                {Day: 'Wednesday', Keith: 30, Erica: 20, George: 25},
                {Day: 'Thursday', Keith: 35, Erica: 25, George: 45},
                {Day: 'Friday', Keith: 20, Erica: 20, George: 25},
                {Day: 'Saturday', Keith: 30, Erica: 20, George: 30},
                {Day: 'Sunday', Keith: 60, Erica: 45, George: 90}
            ];
            return final_data;
        }
        me.create_data_for_google_chart = function (data) {
            var groupedData = _.groupBy(data, function (d) {
                return d.week_of
            });
            var final_data = [];
            var arrKeys = [];
            var key_names = groupedData[data[0].week_of];
            var key_names_group = _.groupBy(key_names, function (d) {
                return d.company
            });
            arrKeys.push('Week');
            for (var name in key_names_group) {
                arrKeys.push(name);
            }
            final_data.push(arrKeys);
            for (var key in groupedData) {
                var arrRow = [];
                var cmp = groupedData[key]
                var cmp_group = _.groupBy(cmp, function (d) {
                    return d.company
                });
                arrRow.push(key);
                for (var k in cmp_group) {
                    arrRow.push(cmp_group[k][0]['vr_units']);
                }
                if (new Date(key).getFullYear() === 2019) {
                    final_data.push(arrRow)
                }
            }
            return final_data;
        }
    }
;
