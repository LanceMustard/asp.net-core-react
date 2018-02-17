import styled, {css}  from 'styled-components';

export const Header = styled.div`
  background-color: #a6a6a6;

  > button {
    margin: 0px 5px 0px 5px;
    background-color: transparent;
    vertical-align: middle;
  }
`
export const Title = styled.span`
  font-size: 24px;
  padding-left: 10px;
  color: #595959;
  text-shadow: 0.5px 0.5px;
  height: 100%;
  vertical-align: middle;
`

export const Wrapper = styled.div`
  display: flex;
  box-shadow: 2px 2px;

  ${props => props.inlineCollapsed && css`
    justify-content: center;
  `}
`

export const Side = styled.div`
  min-height: 600px;
  margin: 10px;
  width: ${props => props.sideWidth ? props.sideWidth : '400px'};
  display: block;

  ${props => props.inlineCollapsed && css`
    display: none;
  `}
`

export const Body = styled.div`
  margin-top: 10px;  
  min-width: 800px;
  min-height: 600px;
  padding: 0px 10px 0px 10px;
`

export const FormToolbar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
export const TableFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`