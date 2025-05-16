import { useState } from 'react';
import { Button } from '@purer-ui/button';

function App() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900'>
      <div className='w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
            Purer UI 按钮示例
          </h1>
        </div>

        <div className='mb-8'>
          <h2 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300'>
            变体
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button variant='solid'>实心按钮</Button>
            <Button variant='outline'>轮廓按钮</Button>
            <Button variant='ghost'>幽灵按钮</Button>
            <Button variant='link'>链接按钮</Button>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300'>
            尺寸
          </h2>
          <div className='flex flex-wrap items-center gap-4'>
            <Button size='sm'>小型按钮</Button>
            <Button size='md'>中型按钮</Button>
            <Button size='lg'>大型按钮</Button>
            <Button size='xl'>超大按钮</Button>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300'>
            颜色
          </h2>
          <div className='flex flex-wrap gap-4 mb-4'>
            <Button color='primary'>主要按钮</Button>
            <Button color='secondary'>次要按钮</Button>
            <Button color='danger'>危险按钮</Button>
            <Button color='success'>成功按钮</Button>
            <Button color='warning'>警告按钮</Button>
          </div>
          <div className='flex flex-wrap gap-4'>
            <Button variant='outline' color='primary'>
              主要按钮
            </Button>
            <Button variant='outline' color='secondary'>
              次要按钮
            </Button>
            <Button variant='outline' color='danger'>
              危险按钮
            </Button>
            <Button variant='outline' color='success'>
              成功按钮
            </Button>
            <Button variant='outline' color='warning'>
              警告按钮
            </Button>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300'>
            状态
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button loading={loading} onClick={handleClick}>
              {loading ? '加载中...' : '点击加载'}
            </Button>
            <Button disabled>禁用按钮</Button>
            <Button fullWidth>全宽按钮</Button>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300'>
            图标
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button
              leftIcon={
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M5 12h14M12 5l7 7-7 7' />
                </svg>
              }
            >
              左侧图标
            </Button>
            <Button
              rightIcon={
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M5 12h14M12 5l7 7-7 7' />
                </svg>
              }
            >
              右侧图标
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
