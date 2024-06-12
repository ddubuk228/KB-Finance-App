<template>
    <div class="modal" :class="{ 'is-active': show }">
      <div class="modal-background" @click="close"></div>
      <div class="modal-content">
        <!-- 닫기 버튼 -->
        <button class="modal-close is-large" aria-label="close" @click="close">Close</button>
        <div class="box">
          <p><strong>거래 내역 요약</strong></p>
          <p>거래 날짜: {{ transactionDate }}</p>
          <p>거래 내역: {{ transactionDetails }}</p>
          <p>금액: {{ amount }}</p>
          <p>메모: {{ memo }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      transactionDate: String,
      transactionDetails: String,
      amount: String,
      memo: String,
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* 모달 스타일 */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: none;
    justify-content: center;
    align-items: center;
  }
  
  .is-active {
    display: flex;
  }
  
  .modal-content {
    border: 3px solid rgb(255, 232, 157);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    height: 450px;
    position: relative; /* 닫기 버튼 정렬을 위해 position 설정 */
  }
  
  .modal-close {
    position: absolute; /* 닫기 버튼을 콘텐츠에 상대적으로 배치 */
    top: 10px; /* 위쪽 여백 조절 */
    right: 10px; /* 우측 여백 조절 */
    background: transparent;
    border: none;
    cursor: pointer;
    width: 60px; /* 닫기 버튼의 크기 설정 */
    height: 40px; /* 닫기 버튼의 크기 설정 */
  } 
  strong {
    font-size: 22px;
    color: rgb(248, 139, 6);
  }
  </style>
  