import styled  from 'styled-components';

export const Header = styled.div`
  background-color: #a6a6a6;

  > h1 {
    padding-left: 20px;
    color: #595959;
    text-shadow: 0.5px 0.5px;
  }
`
export const Wrapper = styled.div`
  display: flex;
  box-shadow: 2px 2px;
`
export const Side = styled.div`
  min-width: 400px;
  min-height: 600px;
  margin: 10px;
`
export const Body = styled.div`
  margin-top: 20px;  
  min-width: 600px;
  min-height: 600px;
`

export const FormToolbar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`