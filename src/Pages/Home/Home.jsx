import {
  faBookmark,
  faCog,
  faFire,
  faHashtag,
  faHome,
  faUser,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostCreate from "../../Components/CreatePost/PostCreate";
import Feed from "../../Components/Feed/Feed";
import NavvBar from "../../Components/NavvBar/NavvBar";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth.context";

export default function Home() {
  let { user, token } = useContext(AuthContext);

  return (
    <>
      <NavvBar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-6 space-y-4">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="h-16 bg-gradient-to-r from-sky-500 to-blue-600"></div>
                  <div className="px-4 pb-4 -mt-8">
                    <img
                      src={user?.photo}
                      className="w-16 h-16 rounded-full border-4 border-white object-cover"
                    />
                    <h3 className="font-semibold text-gray-800 mt-2">
                      {user?.name}
                    </h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <div className="flex justify-between mt-4 text-center text-sm">
                      <div>
                        <p className="font-bold text-gray-800">234</p>
                        <p className="text-gray-500">Posts</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">1.2K</p>
                        <p className="text-gray-500">Followers</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">567</p>
                        <p className="text-gray-500">Following</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 text-gray-600 hover:text-sky-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                      >
                        <FontAwesomeIcon icon={faHome} className="w-5" />
                        <span>Home</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 text-gray-600 hover:text-sky-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                      >
                        <FontAwesomeIcon icon={faUser} className="w-5" />
                        <span>My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 text-gray-600 hover:text-sky-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                      >
                        <FontAwesomeIcon icon={faBookmark} className="w-5" />
                        <span>Saved Posts</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 text-gray-600 hover:text-sky-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                      >
                        <FontAwesomeIcon icon={faUsers} className="w-5" />
                        <span>Groups</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 text-gray-600 hover:text-sky-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                      >
                        <FontAwesomeIcon icon={faCog} className="w-5" />
                        <span>Settings</span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Friends Online */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Friends Online
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                          alt="Friend"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <span className="text-sm text-gray-700">Ahmed Ali</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                          alt="Friend"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <span className="text-sm text-gray-700">
                        Sara Mohamed
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                          alt="Friend"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <span className="text-sm text-gray-700">Omar Hassan</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Feed */}
            <main className="flex-1 min-w-0">
              <PostCreate />
              <Feed />
            </main>

            {/* Right Sidebar */}
            <aside className="hidden xl:block w-72 flex-shrink-0">
              <div className="sticky top-6 space-y-4">
                {/* Trending */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FontAwesomeIcon
                      icon={faFire}
                      className="text-orange-500"
                    />
                    <h3 className="font-semibold text-gray-800">
                      Trending Now
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faHashtag}
                          className="text-sky-500 text-sm"
                        />
                        <span className="font-medium text-gray-800">
                          ReactJS
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">12.5K posts</p>
                    </a>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faHashtag}
                          className="text-sky-500 text-sm"
                        />
                        <span className="font-medium text-gray-800">
                          WebDevelopment
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">8.3K posts</p>
                    </a>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faHashtag}
                          className="text-sky-500 text-sm"
                        />
                        <span className="font-medium text-gray-800">
                          JavaScript
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">6.1K posts</p>
                    </a>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faHashtag}
                          className="text-sky-500 text-sm"
                        />
                        <span className="font-medium text-gray-800">
                          TailwindCSS
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">4.2K posts</p>
                    </a>
                  </div>
                </div>

                {/* Suggested Users */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="text-sky-600"
                    />
                    <h3 className="font-semibold text-gray-800">
                      Suggested For You
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Youssef Ali
                          </p>
                          <p className="text-xs text-gray-500">Frontend Dev</p>
                        </div>
                      </div>
                      <button className="text-sky-600 text-sm font-medium hover:text-sky-700 cursor-pointer">
                        Follow
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Nour Ahmed
                          </p>
                          <p className="text-xs text-gray-500">
                            UI/UX Designer
                          </p>
                        </div>
                      </div>
                      <button className="text-sky-600 text-sm font-medium hover:text-sky-700 cursor-pointer">
                        Follow
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Mariam Khaled
                          </p>
                          <p className="text-xs text-gray-500">
                            React Developer
                          </p>
                        </div>
                      </div>
                      <button className="text-sky-600 text-sm font-medium hover:text-sky-700 cursor-pointer">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-xs text-gray-500 px-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <a href="#" className="hover:underline">
                      About
                    </a>
                    <span>•</span>
                    <a href="#" className="hover:underline">
                      Help
                    </a>
                    <span>•</span>
                    <a href="#" className="hover:underline">
                      Privacy
                    </a>
                    <span>•</span>
                    <a href="#" className="hover:underline">
                      Terms
                    </a>
                  </div>
                  <p>© 2026 Social Hub. All rights reserved.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
