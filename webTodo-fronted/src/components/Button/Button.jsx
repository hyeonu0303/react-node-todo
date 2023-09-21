import { Button } from '@chakra-ui/react';

const CustomButton = (props) => {
  return (
    <Button
      bg="none"
      color="black"
      _hover={{ bg: "var(--mainColor)"}}
      mr={"1"}
      {...props} // 이를 통해 추가적인 속성이나 이벤트를 전달할 수 있습니다.
    >
      {props.children}
    </Button>
  );
}

export default CustomButton;
