import MdxDirectory from '../../../layouts/MdxDirectory';
import pageJson from '@markdown/selfhosted/pages.json';

export default function TestDirectory() {
  return <MdxDirectory mdxData={pageJson} />;
}
