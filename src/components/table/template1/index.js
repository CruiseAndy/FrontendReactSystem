/**
 * structure
 * [ {title, key}, {title, key},... ]
 */

/* tool */
import React, { useState, useEffect } from 'react';

import "./index.scss";

const ReactTable = props => {

  const [ arrPage, setArrPage ] = useState([]);
  const [ detailInfo, setDetailInfo ] = useState(null);
  const [ notificationInfo, setNotificationInfo ] = useState(null);

	useEffect(() => {
    let tmpArr = [];
    const pages = Math.ceil(props.totalAmount / props.perPageAmount);

    for(let i = 1; i <= pages; i++) {
      tmpArr.push(i);
    }
    
    setArrPage(tmpArr);
  }, []);

  const changePage = val => {
    const maxPage = Math.ceil(props.totalAmount / props.perPageAmount);

    if (val == "prev") {
      if (props.nowPage != 1)
        props.onChangePage(props.nowPage - 1);
    }
    else if (val == "next") {
      if (props.nowPage != maxPage)
        props.onChangePage(props.nowPage + 1);
    }
    else
      props.onChangePage(val);
  }

  const setDetailData = (item, data) => {
    let detailData = {
      title: item.detailTitle,
      content: []
    };

    item.detailInfoKey.map((infoKey, index) => {
      detailData.content.push({
        name: item.detailSubTitle[index],
        value: data[infoKey]
      });
    })

    if(item.hasOwnProperty("detailResult")) {
      detailData.result = {
        name: item.detailResult.title,
        value: data[item.detailResult.valKey]
      }
    }

    setDetailInfo(detailData);
  }

  const setNotificationData = data => {
    let notificationlData = {
      title: data.title,
      content: data.content,
      dateTime: data.created_at
    };

    setNotificationInfo(notificationlData);
  }
  
	return (
		<div className="table_component">
      {
        detailInfo &&
        <div className="detail_info_container">
          <div className="detail_info_box">
            <span className="icon-error icon_close" onClick={() => setDetailInfo(null)} />
            <p className="detail_info_title">{detailInfo.title}</p>
            {
              detailInfo.content.map((item, index) => {
                return (
                  <div key={index} className="detail_content_box">
                    <p className="detail_content_title">{item.name}</p>
                    <p className="detail_content_txt">{item.value}</p>
                  </div>
                );
              })
            }
            {
              detailInfo.result &&
              <React.Fragment>
                <div className="hr" />
                <div className="detail_content_box">
                  <p className="detail_content_title">{detailInfo.result.name}</p>
                  <p className="detail_content_txt">{detailInfo.result.value}</p>
                </div>
              </React.Fragment>
            }
          </div>
        </div>
      }
      {
        notificationInfo &&
        <div className="detail_info_container">
          <div className="detail_info_box">
            <span className="icon-error icon_close" onClick={() => setNotificationInfo(null)} />
            <p className="detail_info_title">{notificationInfo.title}</p>
            <div className="detail_content_box">
              <p className="detail_content_txt">{notificationInfo.content}</p>
            </div>
            <div className="detail_datetime_box">
              <span className="detail_datetime_txt">{notificationInfo.dateTime}</span>
            </div>
          </div>
        </div>
      }
			<div className="table_box table">
        <div className="table_title tr">
          { props.structure.map((item, index) => <div key={index} className="td">{item.title}</div>) }
        </div>
        {
          props.data.length == 0
          ? <div className="table_data_group no_data">
              <span className="no_data_txt">{props.noData}</span>
            </div>
          : props.data.map((dataItem, dataIndex) => {
              return (
                <div key={dataIndex} className="table_data_group tr">
                {
                  props.structure.map((item, keyIndex) => {
                    if (item.key == "is_read") {
                      return (
                        <div key={keyIndex} className="notification_unread_box td">
                        {
                          !dataItem[item.key] &&
                          <span className="notification_unread">{props.unRead}</span>
                        }
                        </div>
                      );
                    }
                    else if (item.key == "detail")
                      return (
                        <div key={keyIndex} className="table_img_box td" onClick={() => setDetailData(item, dataItem)}>
                          <div className="img_box">
                            <img src={item.img} />
                          </div>
                        </div>
                      );
                    else if (item.key == "notificationContent")
                      return (
                        <div key={keyIndex} className="table_img_box td" onClick={() => {
                            setNotificationData(dataItem);
                            props.onChangeStatus(dataItem.id);
                          }}>
                          <div className="img_box">
                            <img src={item.img} />
                          </div>
                        </div>
                      );
                    else
                      return <div key={keyIndex} className="table_data_info td">{dataItem[item.key]}</div>
                  })
                }
                </div>
              );
            })
        }
      </div>
      {
        props.data.length != 0 &&
        <div className="pages_box">
          <div className="page_link_box icon_prev" onClick={() => changePage("prev")}>
            <span className="icon-page-prev" />
          </div>
          {
            arrPage.length != 0 &&
            arrPage.map(num => {
              return(
                <div
                  key={num}
                  className={num == props.nowPage ? "page_link_box active" : "page_link_box"}
                  onClick={() => changePage(num)}
                >
                  <span className="page_link_num">{num}</span>
                </div>
              );
            })
          }
          <div className="page_link_box icon_next" onClick={() => changePage("next")}>
            <span className="icon-page-next" />
          </div>
        </div>
      }
		</div>
	);
};

export default ReactTable;