import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Grid, Input, Textarea, Button, Image, Text } from '../elements/index';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import CommentListTest from '../pages/CommentListTest';
import { apis } from '../shared/axios';

const Modal2 = (props) => {
  // 상세포스트 카드 모달창
  // const textInput = useRef();
  // console.log('dkdkdk', textInput);
  // 각각 카드에 대한 postID
  // 서버에 넘겨줄 postID
  const postID = {
    postID: props.el.postID,
  };
  // console.log(postID);
  useEffect(() => {
    apis.update('post/postClick', postID);
  }, []);

  // redux user module에 저장되어있는 현재 유저 정보 불러오기
  const user_data = useSelector((state) => state.user.user);

  const modaloff = () => {
    props._setModal(false);
    dispatch(postActions.setPostFB());
  };
  // 게시물의 닉네임과 세션스토리지에 있는 닉네임을 비교해서 "수정,삭제 버튼 보여줌,안보여줌"
  // 현재는 sessionStorage에 userNickname으로 저장되어있는데, 미다님께서 redux의 user module에 저장할 예정, useSelector로 userNickname 가져와야함
  // const userNickname = sessionStorage.getItem('userNickname');
  const userNickname = user_data !== undefined ? user_data.userNickname : '';
  // const userNickname = "";
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState(props.el.postingTitle);
  const [editContent, setEditContent] = useState(props.el.postingComment);
  const [editButton, setEditButton] = useState(false);
  const [isEditedtitle, setIsEditedtitle] = useState(true);
  const [isEditedcontent, setIsEditedcontent] = useState(true);
  const postingDate = moment().format('YYYY-MM-DD');

  // 서버에 넘겨줄 수정된 데이터
  const update_postdata = {
    postID: props.el.postID,
    postingTitle: editTitle,
    postingAuthor: props.el.postingAuthor,
    postingComment: editContent,
    postingUpdate: postingDate,
  };

  // console.log('해당하는 게시물 ID', postID);

  // 수정 버튼을 누르면 발생하는 함수
  const onModify = () => {
    setIsEditedtitle(!isEditedtitle);
    setIsEditedcontent(!isEditedcontent);
    setEditButton(!editButton);
  };
  // 제목 input 부분 수정
  const editInput = (e) => {
    setEditTitle(e.target.value);
  };
  // 내용 textarea 부분 수정
  const editTextarea = (e) => {
    setEditContent(e.target.value);
  };

  // 수정된 내용을 middleware로 보내기
  const editDataSubmit = () => {
    let bool = window.confirm('정말 수정하실 건가요?');
    if (bool) {
      dispatch(postActions.updatePostFB(update_postdata));
    } else {
      setEditContent(editContent);
      return;
    }
    modaloff();
  };
  // 삭제하기 위해서 postID 서버로 보내기
  const onDelete = () => {
    let bool = window.confirm('정말 삭제하실 건가요?');
    if (bool) {
      dispatch(postActions.deletePostFB(postID));
    } else {
      return;
    }
    modaloff();
  };
  return (
    <>
      <ModalParent>
        <Grid type='modal' height='70vh' overflow>
          <Cancelbtn onClick={modaloff}>닫기</Cancelbtn>
          <Grid margin='0 0 10px 0' is_flex justify='flex-end'>
            {userNickname === props.el.postingAuthor ? (
              <Button margin='0 5px 0 0' _onClick={onModify}>
                수정
              </Button>
            ) : null}
            {userNickname === props.el.postingAuthor ? (
              <Button margin='0 5px 0 0' color='#ff4949' _onClick={onDelete}>
                삭제
              </Button>
            ) : null}
          </Grid>
          <Grid is_flex justify='flex-end'>
            <Image
              height='300px'
              src={
                !props.el.postingImgUrl
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qRSiz3_RF1OMIdMiZvtWrycSyblXRgyl1Q&usqp=CAU'
                  : props.el.postingImgUrl
              }
            />
          </Grid>
          <Grid
            margin='10px 0 0 0'
            padding='10px'
            is_flex
            justify='space-between'
          >
            <Text>{props.el.postingAuthor}</Text>
            <Text>{props.el.postingDate}</Text>
          </Grid>
          <hr style={{ color: 'blue' }} />
          <Grid margin='10px 0 0 0'>
            <Input
              size='25px'
              type='text'
              _onChange={editInput}
              value={editTitle}
              disabled={isEditedtitle}
              // ref={textInput}
            />
          </Grid>
          <Grid margin='10px 0 0 0'>
            <Textarea
              size='18px'
              _onChange={editTextarea}
              value={editContent}
              disabled={isEditedcontent}
            />
          </Grid>
          <Grid margin='10px 0 0 0' is_flex>
            {userNickname === props.el.postingAuthor && editButton ? (
              <Button margin='0 5px 0 0' type='blue' _onClick={editDataSubmit}>
                수정하기
              </Button>
            ) : null}
          </Grid>
          <Grid margin='10px 0 0 0' is_flex>
            <CommentListTest postID={postID} />
          </Grid>
        </Grid>
      </ModalParent>
    </>
  );
};

const ModalParent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Cancelbtn = styled.button`
  position: fixed;
  top: 75px;
  right: 32vw;
  border: none;
  cursor: pointer;
  font-size: 20px;
  background-color: transparent;
  color: #fff;
  transition: all ease 0.3s;
  &:hover {
    color: #ff4949;
  }
  @media ${({ theme }) => theme.tablet} {
    top: 50px;
    right: 10vw;
  }
`;

export default Modal2;
